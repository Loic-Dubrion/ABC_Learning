const express = require('express');

// mergeParams: true is used to access the route parameters of the parent router in the child router
const router = express.Router({ mergeParams: true });

const UserController = require('../../../controllers/API/UserController');

// Create
// router.post('/', UserController.createUser);

// Read
// router.get('/:userId', UserController.getUser);

// Update
// router.put('/:userId', UserController.updateUser);

// Delete
// router.delete('/:userId', UserController.deleteUser);

module.exports = router;
