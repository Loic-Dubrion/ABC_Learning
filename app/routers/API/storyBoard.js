const express = require('express');

const router = express.Router();

// Controllers
const controllerHandler = require('../../controllers/services/controllerHandler');
const { storyBoardController } = require('../../controllers/API');

router.get(
  '/cards',
  controllerHandler(storyBoardController.getAll.bind(storyBoardController)),
);

module.exports = router;
