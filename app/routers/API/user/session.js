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
router.get(
  '/:id',
  controllerHandler(SessionController.getOneByPk.bind(SessionController)),
);

// Update
router.put(
  '/:id',
  controllerHandler(SessionController.updateSession.bind(SessionController)),
);

// Delete
router.delete(
  '/:id',
  controllerHandler(SessionController.delete.bind(SessionController)),
);

module.exports = router;
