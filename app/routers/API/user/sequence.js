const express = require('express');

const router = express.Router({ mergeParams: true });

const SequenceController = require('../../../controllers/API/SequenceController');
const controllerHandler = require('../../../controllers/services/controllerHandler');

//! Create
// router.post(
//   '/',
//   controllerHandler((req, res) => SequenceController.create.bind(SequenceController)(req, res, 'create_sequence')),
// );

//! Read
router.get(
  '/',
  controllerHandler((req, res) => SequenceController.getAllByField.bind(SequenceController)(req, res, 'id')),
);

router.get(
  '/:id',
  controllerHandler(SequenceController.getOneByPk.bind(SequenceController)),
);

// //! Update
// router.put(
//   '/:id',
//   controllerHandler((req, res) => SequenceController.update.bind(SequenceController)(req, res, 'update_sequence')),
// );

//! Delete
router.delete(
  '/:id',
  controllerHandler(SequenceController.delete.bind(SequenceController)),
);

module.exports = router;
