const express = require('express');

// mergeParams: true is used to access the route parameters of the parent router in the child router
const router = express.Router({ mergeParams: true });

const UserController = require('../../../controllers/API/UserController');
const controllerHandler = require('../../../controllers/services/controllerHandler');

// Create
router.post(
  '/',
  controllerHandler(UserController.addUser.bind(UserController)),
);
// Read
router.get(
  '/',
  controllerHandler(UserController.getAll.bind(UserController)),
);

router.get(
  '/:id',
  controllerHandler(UserController.getOneByPk.bind(UserController)),
);

// Update
router.put(
  '/:id',
  controllerHandler((req, res) => UserController.update.bind(UserController)(req, res, 'update_user')),
);

// Delete
router.delete(
  '/:id',
  controllerHandler(UserController.delete.bind(UserController)),
);
module.exports = router;
