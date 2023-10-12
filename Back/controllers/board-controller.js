const boardService = require('../services/board-service');

const createBoard = async (req, res) => {

    let returnedResponse;
    let requestBody = req.body;
    console.log(req);
    try {
        returnedResponse = await boardService.createBoard(requestBody);
        res.status(201).send(returnedResponse);
    } 
    catch (error) {
        res.status(400).send(error.message);
        console.log(error.message);
    }
}

const patchBoard = async (req, res) => {

    let returnedResponse;
    let requestBody = req.body;
    console.log(req);
    try {
        returnedResponse = await boardService.patchBoard(requestBody);
        res.status(201).send(returnedResponse);
    } 
    catch (error) {
        res.status(400).send(error.message);
        console.log(error.message);
    }
}

const getBoard = async (req, res) => {
    try{
        const board = await Board.find(req.params.id);
        res.status(200).send(board);
    }catch{
        res.status(400).send(error.message);
    }
}

module.exports = {
    createBoard,getBoard
}