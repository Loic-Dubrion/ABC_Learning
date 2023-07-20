/* eslint-disable class-methods-use-this */
const jwt = require('jsonwebtoken');

const auth = require('../services/jwtService');
const sendReset = require('../services/sendPasswordReset');
const CoreController = require('./CoreController');
const userDataMapper = require('../../models/UserDataMapper');
const client = require('../../services/clientDB/clientPostgres');

const { Error400, Error403 } = require('../../errors');

class JwtController extends CoreController {
  constructor() {
    super(userDataMapper);
  }

  async logUser(request, response) {
    const { username, password } = request.body;

    const user = await auth.authentify(username, password);

    if (user) {
      const accessToken = auth.generateAccessToken(request.ip, user);
      const refreshToken = await auth.generateRefreshToken(user);

      return response.status(200).json({
        status: 'success',
        data: { accessToken, refreshToken },
      });
    }
    throw new Error403('Username or password invalid');
  }

  /**
   * Controller function for refreshing the access token using a valid refresh token.
   * @param {object} request.headers - The request headers.
   * @param {string} request.headers.authorization - The authorization token.
   * @param {object} response - The response object.
   * @returns {Promise} A promise that resolves to the response
   * containing the new access and refresh tokens.
   */
  async refreshToken(request, response) {
    const user = await auth.getAccessTokenUser(request);
    if (user && (auth.isValidRefreshToken(request, response, user))) {
      const rolesAndPermissions = await auth.getUserRolesAndPermissions(user.id);
      const accessToken = auth.generateAccessToken(
        request.ip,
        { ...user, ...rolesAndPermissions },
      );

      const refreshToken = await auth.generateRefreshToken(user);

      const query = 'UPDATE "user" SET refresh_token=$1 WHERE id=$2';
      const values = [refreshToken, user.id];
      await client.query(query, values);

      response.status(200).json({
        status: 'success',
        data: { accessToken, refreshToken },
      });
    }
  }

  async resetPassword(request, response) {
    const { email } = request.body;

    const user = await JwtController.dataMapper.findOneByField('email', email);
    if (email !== user.email) {
      throw new Error400('Email not valid');
    }

    // Generate a password reset token
    const resetToken = jwt.sign({}, process.env.JWT_SECRET, {
      subject: user.id.toString(),
      expiresIn: '20m',
    });

    await sendReset(user.email, resetToken);

    response.status(200).json({
      status: 'success',
      message: 'Password reset email sent',
    });
  }
}

module.exports = new JwtController();
