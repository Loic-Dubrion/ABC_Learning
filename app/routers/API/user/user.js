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

const { authorize } = require('../../../controllers/services/jwtService');
const { checkRole } = require('../../../controllers/services/checkRBAC');

router.use('/:userId', authorize);
router.use('/:userId', checkRole);

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
  '/:userId',
  controllerHandler(UserController.getUserInfo.bind(UserController)),
);

// Update
router.put(
  '/:userId',
  validate(updateUserBody, 'body'),
  controllerHandler(UserController.updateUser.bind(UserController)),
);

// Delete
router.delete(
  '/:userId',
  validate(deleteUserBody, 'body'),
  controllerHandler(UserController.delete.bind(UserController)),
);
module.exports = router;
