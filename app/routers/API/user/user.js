const express = require('express');

// mergeParams: true is used to access the route parameters of the parent router in the child router
const router = express.Router({ mergeParams: true });

const UserController = require('../../../controllers/API/UserController');
const controllerHandler = require('../../../controllers/services/controllerHandler');

const validate = require('../../../validations/validate');
const {
  createUserBody,
  updateUserBody,
  deleteUserBody,
} = require('../../../validations/schemas');

const { checkUserId } = require('../../../controllers/services/checkRBAC');
const { authorize } = require('../../../controllers/services/jwtService');

router.use('/:userId', authorize);
router.use('/:userId', checkUserId);

// Create
router.post(
  '/',
  validate(createUserBody, 'body'),
  controllerHandler(UserController.addUser.bind(UserController)),
);
// Read
router.get(
  '/',
  controllerHandler(UserController.getAll.bind(UserController)),
);

router.get(
  '/:id',
  controllerHandler(UserController.getUserInfo.bind(UserController)),
);

// Update
router.put(
  '/:id',
  validate(updateUserBody, 'body'),
  controllerHandler((req, res) => UserController.update.bind(UserController)(req, res, 'update_user')),
);

// Delete
router.delete(
  '/:id',
  validate(deleteUserBody, 'body'),
  controllerHandler(UserController.delete.bind(UserController)),
);
module.exports = router;
