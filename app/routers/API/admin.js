const express = require('express');

const router = express.Router();

// // Controllers
// const controllerHandler = require('../../controllers/services/controllerHandler');
// const { adminController } = require('../../controllers/API');

// // Middlewares
// const { checkRole, checkPermission } = require('../../controllers/services/checkRBAC');
// const { authorize } = require('../../controllers/services/jwtService');

// router.use('/:userId', authorize);

// router.get(
//   '/:userId/stat',
//   checkRole('Admin'),
//   checkPermission('View_stats'),
//   controllerHandler(adminController.getAll.bind(adminController)),
// );

module.exports = router;
