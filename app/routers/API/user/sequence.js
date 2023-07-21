// Importing the Express module to handle routes
const express = require('express');

// Creating a new router instance and merging the request parameters across router instances
const router = express.Router({ mergeParams: true });

// Importing the SequenceController
const SequenceController = require('../../../controllers/API/SequenceController');
// Importing the controller handler
const controllerHandler = require('../../../controllers/services/controllerHandler');

/**
 * POST /sequences
 *
 * @summary Create a sequence
 * @tags Sequences - Operations related to sequences
 * @description This route is used to create a new sequence.
 * @return {object} 200 - Successful response, an object representing the created sequence.
 * @throws {Error} On failure
 */
//! Create
router.post(
  '/',
  controllerHandler((req, res) => SequenceController.create.bind(SequenceController)(req, res, 'create_sequence')),
);

/**
 * GET /sequences
 *
 * @summary Get all sequences by user_id
 * @tags Sequences - Operations related to sequences
 * @description This route returns all sequences associated with a user_id.
 * @return {Array.<object>} 200 - Successful response, an array of objects each representing a sequence.
 * @throws {Error} On failure
 */
//! Read
router.get(
  '/',
  controllerHandler((req, res) => SequenceController.getAllByField.bind(SequenceController)(req, res, 'user_id')),
);

/**
 * GET /sequences/:id
 *
 * @summary Get a specific sequence by ID
 * @tags Sequences - Operations related to sequences
 * @description This route returns a specific sequence based on ID.
 * @param {number} id.path.required - The ID of the sequence to retrieve
 * @return {object} 200 - Successful response, an object representing the sequence.
 * @throws {Error} On failure
 */
router.get(
  '/:id',
  controllerHandler(SequenceController.getDetailSequence.bind(SequenceController)),
);

/**
 * PUT /sequences/:id
 *
 * @summary Update a specific sequence by ID
 * @tags Sequences - Operations related to sequences
 * @description This route updates a specific sequence based on ID.
 * @param {number} id.path.required - The ID of the sequence to update
 * @return {object} 200 - Successful response, an object representing the updated sequence.
 * @throws {Error} On failure
 */
//! Update
router.put(
  '/:id',
  controllerHandler((req, res) => SequenceController.update.bind(SequenceController)(req, res, 'update_sequence')),
);

/**
 * DELETE /sequences/:id
 *
 * @summary Delete a specific sequence by ID
 * @tags Sequences - Operations related to sequences
 * @description This route deletes a specific sequence based on ID.
 * @param {number} id.path.required - The ID of the sequence to delete
 * @return {object} 200 - Successful response.
 * @throws {Error} On failure
 */
//! Delete
router.delete(
  '/:id',
  controllerHandler(SequenceController.delete.bind(SequenceController)),
);

// Exporting the router
module.exports = router;
