const express = require('express');
const router = express.Router();

const boardController = require('../controllers/board-controller');

router
    .post('/createboard', boardController.createBoard)
    .get('/', boardController.getAllBoard)
    .patch('/patchboard/:id', boardController.patchBoardState)

module.exports = router;