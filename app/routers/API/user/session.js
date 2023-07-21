// Importing the Express module to handle routes
const express = require('express');

// Creating a new router instance and merging the request parameters across router instances
const router = express.Router({ mergeParams: true });

// Importing the controller handler
const controllerHandler = require('../../../controllers/services/controllerHandler');
// Importing the SessionController
const SessionController = require('../../../controllers/API/SessionController');

/**
 * POST /sessions
 *
 * @summary Create a session
 * @tags Sessions - Operations related to sessions
 * @description This route is used to create a new session.
 * @return {object} 200 - Successful response, an object representing the created session.
 * @throws {Error} On failure
 */
//! Create
router.post(
  '/',
  controllerHandler((req, res) => SessionController.create.bind(SessionController)(req, res, 'create_session')),
);

/**
 * GET /sessions/:id
 *
 * @summary Get a specific session by ID
 * @tags Sessions - Operations related to sessions
 * @description This route returns a specific session based on ID.
 * @param {number} id.path.required - The ID of the session to retrieve
 * @return {object} 200 - Successful response, an object representing the session.
 * @throws {Error} On failure
 */
//! Read
router.get(
  '/:id',
  controllerHandler(SessionController.getOneByPk.bind(SessionController)),
);

/**
 * PUT /sessions/:id
 *
 * @summary Update a specific session by ID
 * @tags Sessions - Operations related to sessions
 * @description This route updates a specific session based on ID.
 * @param {number} id.path.required - The ID of the session to update
 * @return {object} 200 - Successful response, an object representing the updated session.
 * @throws {Error} On failure
 */
//! Update
router.put(
  '/:id',
  controllerHandler((req, res) => SessionController.update.bind(SessionController)(req, res, 'update_session')),
);

/**
 * DELETE /sessions/:id
 *
 * @summary Delete a specific session by ID
 * @tags Sessions - Operations related to sessions
 * @description This route deletes a specific session based on ID.
 * @param {number} id.path.required - The ID of the session to delete
 * @return {object} 200 - Successful response.
 * @throws {Error} On failure
 */
//! Delete
router.delete(
  '/:id',
  controllerHandler(SessionController.delete.bind(SessionController)),
);

// Exporting the router
module.exports = router;
