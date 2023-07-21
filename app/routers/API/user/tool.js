// Importing the Express module to handle routes
const express = require('express');

// Creating a new router instance and merging the request parameters across router instances
const router = express.Router({ mergeParams: true });

// Importing the ToolController
const ToolController = require('../../../controllers/API/ToolController');
// Importing the controller handler
const controllerHandler = require('../../../controllers/services/controllerHandler');

/**
 * POST /tools
 *
 * @summary Create a tool
 * @tags Tools - Operations related to tools
 * @description This route is used to create a new tool.
 * @return {object} 200 - Successful response, an object representing the created tool.
 * @throws {Error} On failure
 */
//! Create
router.post(
  '/',
  controllerHandler((req, res) => ToolController.create.bind(ToolController)(req, res, 'create_tool')),
);

/**
 * GET /tools
 *
 * @summary Get all tools
 * @tags Tools - Operations related to tools
 * @description This route returns all tools.
 * @return {Array.<object>} 200 - Successful response, an array of objects each representing a tool.
 * @throws {Error} On failure
 */
//! Read
router.get(
  '/',
  controllerHandler(ToolController.getAll.bind(ToolController)),
);

/**
 * GET /tools/:id
 *
 * @summary Get a specific tool by ID
 * @tags Tools - Operations related to tools
 * @description This route returns a specific tool based on ID.
 * @param {number} id.path.required - The ID of the tool to retrieve
 * @return {object} 200 - Successful response, an object representing the tool.
 * @throws {Error} On failure
 */
router.get(
  '/:id',
  controllerHandler(ToolController.getOneByPk.bind(ToolController)),
);

/**
 * PUT /tools/:id
 *
 * @summary Update a specific tool by ID
 * @tags Tools - Operations related to tools
 * @description This route updates a specific tool based on ID.
 * @param {number} id.path.required - The ID of the tool to update
 * @return {object} 200 - Successful response, an object representing the updated tool.
 * @throws {Error} On failure
 */
//! Update
router.put(
  '/:id',
  controllerHandler((req, res) => ToolController.update.bind(ToolController)(req, res, 'update_tool')),
);

/**
 * PATCH /tools/:id
 *
 * @summary Create a relationship between a tool and a card
 * @tags Tools - Operations related to tools
 * @description This route is used to create a relationship between a tool and a card.
 * @param {number} id.path.required - The ID of the tool to relate with a card
 * @return {object} 200 - Successful response, an object representing the relationship.
 * @throws {Error} On failure
 */
router.patch(
  '/:id',
  controllerHandler((req, res) => ToolController.create.bind(ToolController)(req, res, 'create_card_has_tool')),
);

/**
 * DELETE /tools/:id
 *
 * @summary Delete a specific tool by ID
 * @tags Tools - Operations related to tools
 * @description This route deletes a specific tool based on ID.
 * @param {number} id.path.required - The ID of the tool to delete
 * @return {object} 200 - Successful response.
 * @throws {Error} On failure
 */
//! Delete
router.delete(
  '/:id',
  controllerHandler(ToolController.delete.bind(ToolController)),
);

// Exporting the router
module.exports = router;
