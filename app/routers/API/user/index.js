const express = require('express');

// mergeParams: true is used to access the route parameters of the parent router in the child router
const router = express.Router({ mergeParams: true });

const sequenceRouter = require('./sequence');
const sessionRouter = require('./session');
const userRouter = require('./user');
const toolRouter = require('./tool');

router.use('/:userId/sequence', sequenceRouter);
router.use('/:userId/session', sessionRouter);
router.use('/tool', toolRouter);
router.use('/', userRouter);

module.exports = router;
