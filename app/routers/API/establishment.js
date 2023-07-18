const express = require('express');

const router = express.Router();

// Controllers
const establishmentController = require('../../controllers/API/EstablishmentController');
const controllerHandler = require('../../controllers/services/controllerHandler');

//! Create
router.post(
  '/',
  controllerHandler((req, res) => establishmentController.create.bind(establishmentController)(req, res, 'create_establishment')),
);

//! Read
router.get(
  '/',
  controllerHandler(establishmentController.getAll.bind(establishmentController)),
);

router.get(
  '/:id',
  controllerHandler(establishmentController.getOneByPk.bind(establishmentController)),
);

//! Update
router.put(
  '/:id',
  controllerHandler((req, res) => establishmentController.update.bind(establishmentController)(req, res, 'update_establishment')),
);

//! Delete
router.post(
  '/',
  controllerHandler(establishmentController.delete.bind(establishmentController)),
);

module.exports = router;
