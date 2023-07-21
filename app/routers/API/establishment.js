// Importing Express module for handling routes
const express = require('express');

// Creating a new router instance
const router = express.Router();

// Importing controllers
const establishmentController = require('../../controllers/API/EstablishmentController');
const controllerHandler = require('../../controllers/services/controllerHandler');

// Importing authorization checking services
const { checkPermission } = require('../../controllers/services/checkRBAC');
const { authorize } = require('../../controllers/services/jwtService');

// Applying authorization and permission checking middlewares to all routes
router.use('/', authorize, checkPermission('crud_establishment'));

/**
 * POST /establishments
 *
 * @summary Create an establishment
 * @tags Establishments - Operations related to establishments
 * @description This route is used to create a new establishment.
 * @return {object} 200 - Successful response.
 * @throws {Error} 401 - Unauthorized
 */
//! Create
router.post(
  '/',
  controllerHandler((req, res) => establishmentController.create.bind(establishmentController)(req, res, 'create_establishment')),
);

/**
 * GET /establishments
 *
 * @summary Get all establishments
 * @tags Establishments - Operations related to establishments
 * @description This route returns all establishments.
 * @return {Array.<object>} 200 - Successful response, an array of objects each representing an establishment.
 * @throws {Error} 401 - Unauthorized
 */
//! Read
router.get(
  '/',
  controllerHandler(establishmentController.getAll.bind(establishmentController)),
);

/**
 * GET /establishments/:id
 *
 * @summary Get a specific establishment by ID
 * @tags Establishments - Operations related to establishments
 * @description This route returns a specific establishment based on ID.
 * @param {number} id.path.required - The ID of the establishment to retrieve
 * @return {object} 200 - Successful response, an object representing the establishment.
 * @throws {Error} 401 - Unauthorized
 */
router.get(
  '/:id',
  controllerHandler(establishmentController.getOneByPk.bind(establishmentController)),
);

/**
 * PUT /establishments/:id
 *
 * @summary Update a specific establishment by ID
 * @tags Establishments - Operations related to establishments
 * @description This route updates a specific establishment based on ID.
 * @param {number} id.path.required - The ID of the establishment to update
 * @return {object} 200 - Successful response, an object representing the updated establishment.
 * @throws {Error} 401 - Unauthorized
 */
//! Update
router.put(
  '/:id',
  controllerHandler((req, res) => establishmentController.update.bind(establishmentController)(req, res, 'update_establishment')),
);

/**
 * DELETE /establishments
 *
 * @summary Delete an establishment
 * @tags Establishments - Operations related to establishments
 * @description This route is used to delete an establishment.
 * @return {object} 200 - Successful response.
 * @throws {Error} 401 - Unauthorized
 */
//! Delete
router.delete(
  '/:id',
  controllerHandler(establishmentController.delete.bind(establishmentController)),
);

// Exporting the router
module.exports = router;
