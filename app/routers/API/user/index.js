const express = require('express');

const { checkRole, checkPermission } = require('../../../controllers/services/checkRBAC');
const { authorize } = require('../../../controllers/services/jwtService');

// mergeParams: true is used to access the route parameters of the parent router in the child router
const router = express.Router({ mergeParams: true });

const sequenceRouter = require('./sequence');
const sessionRouter = require('./session');
const userRouter = require('./user');
const toolRouter = require('./tool');

// Uncomment to apply role and permission checks
router.use('/:userId', authorize, checkRole);
router.use('/tool', authorize, checkPermission('crud_tool'));

router.use('/:userId/sequence', sequenceRouter);
router.use('/:userId/session', sessionRouter);
router.use('/tool', toolRouter);
router.use('/', userRouter);

module.exports = router;
