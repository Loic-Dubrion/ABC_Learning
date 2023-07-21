/**
 * @module Services_Controllers
 */

// import libraries
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const client = require('../../services/clientDB/clientPostgres');

// import environment variables
const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION ?? '15m';
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION ?? '7d';

// import errors
const { Error401, Error403 } = require('../../errors');

// import models
const UserDataMapper = require('../../models/UserDataMapper');

const auth = {
  async getUserRolesAndPermissions(userId) {
    const result = await UserDataMapper.executeFunction('get_user_roles_and_permissions', userId);
    if (result.length > 0) {
      const { roles, permissions } = result[0];
      return { roles, permissions };
    }
    return null;
  },

  async authentify(username, password) {
    const result = await UserDataMapper.findAllByField('username', username);
    if (result) {
      const foundUser = result;

      if (foundUser) {
        const isGoodPassword = await bcrypt.compare(password, foundUser.password);

        if (isGoodPassword) {
          const rolesAndPermissions = await this.getUserRolesAndPermissions(foundUser.id);
          return { ...foundUser, ...rolesAndPermissions };
        }
      }
    }
    return false;
  },

  generateAccessToken(ip, user) {
    const token = jwt.sign(
      {
        data: {
          ip,
          id: user.id,
          username: user.username,
          roles: user.roles,
          permissions: user.permissions,
        },
      },
      JWT_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRATION },
    );
    return token;
  },

  async generateRefreshToken(user) {
    const refreshToken = jwt.sign(
      {
        data: {
          id: user.id,
        },
      },
      JWT_REFRESH_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRATION },
    );
    // update refresh_token in the database
    const query = 'UPDATE "user" SET refresh_token=$1 WHERE id=$2';
    const values = [refreshToken, user.id];
    await client.query(query, values);

    return refreshToken;
  },

  authorize(request, response, next) {
    try {
      const token = auth.getAccessJWT(request);
      const decodedToken = jwt.verify(token, JWT_SECRET);

      const tokenIPSegments = decodedToken.data.ip.split('.').slice(0, 3);
      const requestIPSegments = request.ip.split('.').slice(0, 3);
      if (tokenIPSegments.join('.') === requestIPSegments.join('.')) {
        return next();
      }

      throw new Error401('Invalid token');
    } catch (err) {
      throw new Error401(err.message);
    }
  },

  async getAccessTokenUser(request) {
    const token = auth.getAccessJWT(request);
    const decodedToken = jwt.verify(token, JWT_SECRET, { ignoreExpiration: true });

    const user = await UserDataMapper.findAllByField('username', decodedToken.data.username);

    if (!user) {
      throw new Error401('User not found');
    }

    if (decodedToken.data.username !== user.username) {
      throw new Error401('Mismatching usernames');
    }
    return user;
  },

  getAccessJWT(request) {
    const authHeader = request.headers.authorization;
    if (authHeader) {
      const token = authHeader.split('Bearer ')[1];
      return token;
    }
    throw new Error401('No token provided');
  },

  async isValidRefreshToken(request, response, user) {
    const { refreshToken } = request.body;
    if (!refreshToken) {
      return response.status(401).json({ error: 'No refresh token found' });
    }

    let decodedRefreshToken;
    try {
      decodedRefreshToken = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    } catch (error) {
      return response.status(401).json({ error: 'token invalid' });
    }

    const foundUser = await UserDataMapper.findAllByField('id', decodedRefreshToken.data.id);

    if (foundUser) {
      if (foundUser.username === user.username && refreshToken === foundUser.refresh_token) {
        return true;
      }
      throw new Error403('Unmatching users between access and refresh tokens');
    }

    throw new Error401('User not found');
  },
};

module.exports = auth;
