const express = require('express');

const router = express.Router({ mergeParams: true });

const ToolController = require('../../../controllers/API/ToolController');
const controllerHandler = require('../../../controllers/services/controllerHandler');

//! Create
router.post(
  '/',
  controllerHandler((req, res) => ToolController.create.bind(ToolController)(req, res, 'create_tool')),
);

//! Read
router.get(
  '/',
  controllerHandler(ToolController.getAll.bind(ToolController)),
);

router.get(
  '/:id',
  controllerHandler(ToolController.getOneByPk.bind(ToolController)),
);

//! Update
router.put(
  '/:id',
  controllerHandler((req, res) => ToolController.update.bind(ToolController)(req, res, 'update_tool')),
);

router.patch(
  '/:id',
  controllerHandler((req, res) => ToolController.create.bind(ToolController)(req, res, 'create_card_has_tool')),
);

//! Delete
router.delete(
  '/:id',
  controllerHandler(ToolController.delete.bind(ToolController)),
);

module.exports = router;
