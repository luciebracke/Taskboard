const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');

router
.get('/', userController.getAllUsers)
.post('/register', userController.createUser)
.patch('/:id', userController.updateUser)
.delete('/:id', userController.deleteUser);

module.exports = router;