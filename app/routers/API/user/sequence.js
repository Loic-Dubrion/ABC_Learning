const express = require('express');

const router = express.Router({ mergeParams: true });

const SequenceController = require('../../../controllers/API/SequenceController');

// Create
// router.post('/', SequenceController.createSequence);

// Read
// router.get('/:sequenceId', SequenceController.getSequence);

// Update
// router.put('/:sequenceId', SequenceController.updateSequence);

// Delete
// router.delete('/:sequenceId', SequenceController.deleteSequence);

module.exports = router;
