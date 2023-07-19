// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');

// Modules
const CoreController = require('./CoreController');
const userDataMapper = require('../../models/UserDataMapper');
const Error400 = require('../../errors/Error400');
const client = require('../../services/clientDB/clientPostgres');
const auth = require('../services/jwtService');

/** Class representing a user controller. */
class UserController extends CoreController {
  constructor() {
    super(userDataMapper);
  }
}

//   async addUser(request, response) {
//     const dataUser = request.body;
//     // check for an identical user.
//     const user = await this.constructor.dataMapper.findOneByField('username', dataUser.username);
//     if (user) {
//       throw new Error400('Existing user');
//     }
//     // check for an identical email
//     const email = await this.constructor.dataMapper.findOneByField('email', dataUser.email);
//     if (email) {
//       throw new Error400('Existing email address');
//     }
//     // extract the password from the object and hash it
//     const { password, ...userWithoutPassword } = dataUser;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const modifiedDataUser = { ...userWithoutPassword, password: hashedPassword };
//     const results = await this.constructor.dataMapper.executeFunction('insert_user', modifiedDataUser);
//     response.status(201).json(results);
//   }

//   /**
//    * Update an existing user.
//    *
//    * @param {Object} request - 1, 2 or 3 parameters (username, email, password)
//    * and the actualy password.
//    * @param {Object} response - The response object.
//    */
//   async updateUser(request, response) {
//     const { userId } = request.params;
//     const { ...objData } = request.body;

//     let user = await this.constructor.dataMapper.findOneByField('id', userId);
//     const isGoodPassword = await bcrypt.compare(objData.old_password, user.password);
//     if (!isGoodPassword) {
//       throw new Error400('Password invalid');
//     }

//     // if new password hash
//     if (objData.password) {
//       const hashedPassword = await bcrypt.hash(objData.password, 10);
//       objData.password = hashedPassword;
//     }

//     const results = await this.constructor.dataMapper.executeFunction('update_user', userId, objData);

//     // Update user's data with new values
//     user = { ...user, ...objData };

//     // Get roles and permissions of the user
//     const rolesAndPermissions = await auth.getUserRolesAndPermissions(userId);
//     user = { ...user, ...rolesAndPermissions };

//     // generate access and refresh tokens after user details update
//     const accessToken = auth.generateAccessToken(request.ip, user);
//     const refreshToken = await auth.generateRefreshToken(user);

//     response.json({
//       update_user: results[0].update_user,
//       tokens: { accessToken, refreshToken },
//     });
//   }

//   /**
//    * Delete a user.
//    *
//    * @param {Object} request - User Id in the URL.
//    * @param {Object} response - The response object.
//    */
//   async deleteUser(request, response) {
//     const { userId } = request.params;
//     const { password } = request.body;

//     const user = await this.constructor.dataMapper.findOneByField('id', userId);

//     const isGoodPassword = await bcrypt.compare(password, user.password);
//     if (!isGoodPassword) {
//       throw new Error400('Password invalid');
//     }

//     const results = await this.constructor.dataMapper.executeFunction('delete_user', userId);
//     response.json(results);
//   }
// }

module.exports = new UserController();
