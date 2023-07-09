const express = require('express');

const router = express.Router();

// Controllers
// const controllerHandler = require('../../controllers/services/controllerHandler');
// const { userController } = require('../../controllers/API');

// Import Middlewares
// const validate = require('../../validations/validate');
// const {
//   createUserBody,
//   updateUserBody,
//   deleteUserBody,
// } = require('../../validations/schemas');
// const { checkUserId } = require('../../controllers/services/checkRBAC');
// const { authorize } = require('../../controllers/services/jwtService');

// router.use('/:userId', authorize);
// router.use('/:userId', checkUserId);

// router.post(
//   '/',
//   validate(createUserBody, 'body'),
//   controllerHandler(userController.addUser.bind(userController)),
// );

// router.get(
//   '/:userId',
//   controllerHandler(userController.getFavoriteCountries.bind(userController)),
// );

module.exports = router;
