// Importing the Express module to handle routes
const express = require('express');

// Creating a new router instance and merging the request parameters across router instances
const router = express.Router({ mergeParams: true });

// Importing the UserController and controller handler
const UserController = require('../../../controllers/API/UserController');
const controllerHandler = require('../../../controllers/services/controllerHandler');

// Importing validation middleware and schemas
const validate = require('../../../validations/validate');
const {
  createUserBody,
  updateUserBody,
  deleteUserBody,
} = require('../../../validations/schemas');

/**
 * POST /users
 *
 * @summary Create a user
 * @tags Users - Operations related to users
 * @description This route is used to create a new user. The body of the request is validated before the user is created.
 * @return {object} 200 - Successful response, an object representing the created user.
 * @throws {Error} On validation or creation failure
 */
// Create
router.post(
  '/',
  validate(createUserBody, 'body'), // Validate the request body
  controllerHandler(UserController.addUser.bind(UserController)), // Create the user
);

/**
 * GET /users
 *
 * @summary Get all users
 * @tags Users - Operations related to users
 * @description This route returns all users.
 * @return {Array.<object>} 200 - Successful response, an array of objects each representing a user.
 * @throws {Error} On failure
 */
// Read
router.get(
  '/',
  controllerHandler(UserController.getAll.bind(UserController)), // Get all users
);

/**
 * GET /users/:userId
 *
 * @summary Get a specific user by ID
 * @tags Users - Operations related to users
 * @description This route returns a specific user based on ID.
 * @param {number} userId.path.required - The ID of the user to retrieve
 * @return {object} 200 - Successful response, an object representing the user.
 * @throws {Error} On failure
 */
router.get(
  '/:userId',
  controllerHandler(UserController.getUserInfo.bind(UserController)), // Get specific user by ID
);

/**
 * PUT /users/:userId
 *
 * @summary Update a specific user by ID
 * @tags Users - Operations related to users
 * @description This route updates a specific user based on ID. The body of the request is validated before the user is updated.
 * @param {number} userId.path.required - The ID of the user to update
 * @return {object} 200 - Successful response, an object representing the updated user.
 * @throws {Error} On validation or update failure
 */
// Update
router.put(
  '/:userId',
  validate(updateUserBody, 'body'), // Validate the request body
  controllerHandler(UserController.updateUser.bind(UserController)), // Update the user
);

/**
 * DELETE /users/:userId
 *
 * @summary Delete a specific user by ID
 * @tags Users - Operations related to users
 * @description This route deletes a specific user based on ID. The body of the request is validated before the user is deleted.
 * @param {number} userId.path.required - The ID of the user to delete
 * @return {object} 200 - Successful response.
 * @throws {Error} On validation or deletion failure
 */
// Delete
router.delete(
  '/:userId',
  validate(deleteUserBody, 'body'), // Validate the request body
  controllerHandler(UserController.delete.bind(UserController)), // Delete the user
);

// Exporting the router
module.exports = router;
