// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');

// Modules
const CoreController = require('./CoreController');
const userDataMapper = require('../../models/UserDataMapper');
const Error400 = require('../../errors/Error400');
const auth = require('../services/jwtService');

/** Class representing a user controller. */
class UserController extends CoreController {
  constructor() {
    super(userDataMapper);
  }

  async getUserInfo(request, response) {
    const { userId } = request.params;
    console.log(userId);
    const results = await this.dataMapper.executeFunction('get_user_info', userId);
    response.json(results);
  }

  async addUser(request, response) {
    const dataUser = request.body;
    // check for an identical user.
    const user = await this.dataMapper.findAllByField('user', dataUser.username);
    if (user) {
      throw new Error400('Existing user');
    }
    // check for an identical email
    const email = await this.dataMapper.findAllByField('email', dataUser.email);
    if (email) {
      throw new Error400('Existing email address');
    }
    // extract the password from the object and hash it
    const { password, ...userWithoutPassword } = dataUser;
    const hashedPassword = await bcrypt.hash(password, 10);
    const modifiedDataUser = { ...userWithoutPassword, password: hashedPassword };
    const results = await this.dataMapper.executeFunction('create_user', modifiedDataUser);
    response.status(201).json(results);
  }

  async updateUser(request, response) {
    const { userId } = request.params;
    const { ...objData } = request.body;
    let user = await this.dataMapper.findAllByField('id', userId);
    const isGoodPassword = await bcrypt.compare(objData.old_password, user.password);
    if (!isGoodPassword) {
      throw new Error400('Password invalid');
    }

    // if new password hash
    if (objData.password) {
      const hashedPassword = await bcrypt.hash(objData.password, 10);
      objData.password = hashedPassword;
    }

    const results = await this.dataMapper.executeFunction('update_user', userId, objData);

    // Update user's data with new values
    user = { ...user, ...objData };

    // Get roles and permissions of the user
    const rolesAndPermissions = await auth.getUserRolesAndPermissions(userId);
    user = { ...user, ...rolesAndPermissions };

    // generate access and refresh tokens after user details update
    const accessToken = auth.generateAccessToken(request.ip, user);
    const refreshToken = await auth.generateRefreshToken(user);

    response.json({
      results,
      tokens: { accessToken, refreshToken },
    });
  }
}

module.exports = new UserController();
