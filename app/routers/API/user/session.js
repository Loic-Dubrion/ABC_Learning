const express = require('express');

const router = express.Router({ mergeParams: true });

const controllerHandler = require('../../../controllers/services/controllerHandler');
const SessionController = require('../../../controllers/API/SessionController');

//! Create
router.post(
  '/',
  controllerHandler((req, res) => SessionController.create.bind(SessionController)(req, res, 'create_session')),
);

//! Read
router.get(
  '/:id',
  controllerHandler(SessionController.getOneByPk.bind(SessionController)),
);

//! Update
router.put(
  '/:id',
  controllerHandler((req, res) => SessionController.update.bind(SessionController)(req, res, 'update_session')),
);

//! Delete
router.delete(
  '/:id',
  controllerHandler(SessionController.delete.bind(SessionController)),
);

module.exports = router;
