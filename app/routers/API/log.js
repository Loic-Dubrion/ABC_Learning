// This module is used to manage routes for JWT authentication
const express = require('express');

// Creation of new router instance
const router = express.Router();

// Importing controller
const controllerHandler = require('../../controllers/services/controllerHandler');
const jwtController = require('../../controllers/API/JwtController');

/**
 * POST /log/in
 *
 * @summary User authentication
 * @tags Authentication - Operations about user authentication
 * @description This route is used for user authentication. It uses the logUser method from JwtController.
 *
 * @param {object} userCredentials.body.required - The credentials of the user trying to log in
 * @return {object} 200 - Success response, returns JWT token
 * @throws {Error} 401 - Unauthorized
 */
router.post('/in', controllerHandler(jwtController.logUser));

/**
 * POST /log/refresh-token
 *
 * @summary Refresh authentication token
 * @tags Authentication - Operations about user authentication
 * @description This route is used to refresh JWT token. It uses the refreshToken method from JwtController.
 *
 * @param {string} refreshToken.body.required - The refresh token of the user trying to get a new JWT token
 * @return {object} 200 - Success response, returns new JWT token
 * @throws {Error} 401 - Unauthorized
 */
router.post('/refresh-token', controllerHandler(jwtController.refreshToken));

// This commented route can be used for resetting password. To activate it, uncomment the following line
// router.post('/reset-password', controllerHandler(jwtController.resetPassword));

// Export the router
module.exports = router;
