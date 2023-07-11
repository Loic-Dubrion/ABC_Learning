const express = require('express');

const router = express.Router({ mergeParams: true });

const controllerHandler = require('../../../controllers/services/controllerHandler');
const SessionController = require('../../../controllers/API/SessionController');

// Create
router.post(
  '/',
  controllerHandler(SessionController.createSession.bind(SessionController)),
);

// Read
// router.get('/:sessionId', SessionController.getSession);

// Update
// router.put('/:sessionId', SessionController.updateSession);

// Delete
// router.delete('/:sessionId', SessionController.deleteSession);

module.exports = router;
