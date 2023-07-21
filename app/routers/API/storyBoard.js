const express = require('express');

const router = express.Router();

// Controllers
const controllerHandler = require('../../controllers/services/controllerHandler');
const { storyBoardController } = require('../../controllers/API');

/**
 * @typedef {object} CardRecto
 * @property {number} id - The unique identifier of the card
 * @property {string} name - The name of the card
 * @property {Array<string>} activities - A list of activities associated with the card
 * @property {string} comments - Comments or notes about the card
 */

/**
 * @typedef {object} Tool
 * @property {number} tool_id - ID of the tool
 * @property {string} tool_name - Name of the tool
 * @property {number} level_id - ID of the level
 * @property {string} level_name - Name of the level
 */

/**
 * @typedef {object} ToolCategory
 * @property {number} tool_category_id - ID of the tool category
 * @property {string} tool_category_name - Name of the tool category
 * @property {Array.<Tool>} tools - An array of tools belonging to the category
 */

/**
 * @typedef {object} CardVerso
 * @property {number} card_id - ID of the card
 * @property {string} card_name - Name of the card
 * @property {Array.<string>} activities - An array of activities related to the card
 * @property {Array.<ToolCategory>} tool_categories - An array of tool categories related to the card
 */

/**
 * GET /storyBoard/cards
 *
 * @summary Get all cards
 * @tags Cards - Operations about cards
 * @description
 * This route returns all cards with their names and comments.
 *
 * @return {Array.<CardRecto>} 200 - Success response.
 * An array of objects where each object represents a card with its name and comments.
 *
 * @throws {Error}
 */
router.get(
  '/cards',
  controllerHandler(storyBoardController.getAll.bind(storyBoardController)),
);

/**
 * GET /storyBoard/cards/{cardId}
 *
 * @summary Get a specific card
 * @tags Cards - Operations about cards
 * @description
 * This route returns a card with its activities, categories, and tools.
 *
 * @param {number} cardId.path.required - The ID of the card to fetch
 *
 * @return {Array.<CardVerso>} 200 - Success response.
 * An array of objects where each object represents an activity, category, or tool related to the card.
 *
 * @throws {Error}
 */
router.get(
  '/cards/:cardId',
  controllerHandler(storyBoardController.getActivities.bind(storyBoardController)),
);

module.exports = router;
