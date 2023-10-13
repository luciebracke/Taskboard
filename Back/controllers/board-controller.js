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

const patchBoardState = async (req, res) => {

    let returnedResponse;
    let requestBody = req.body;
    console.log(req);
    try {
        returnedResponse = await boardService.patchBoardState(requestBody);
        res.status(201).send(returnedResponse);
    } 
    catch (error) {
        res.status(400).send(error.message);
        console.log(error.message);
    }
}
//TODO: A modifier pour que ça fonctionne
const getBoard = async (req, res) => {
    try{
        const board = await Board.find(req.params.id);
        res.status(200).send(board);
    }catch(error){
        res.status(400).send(error.message);
    }
}
const getAllBoard = async (req, res) => {
    try{
        returnedResponse = await boardService.getAllBoard();
        res.status(200).send(returnedResponse);
    }catch (error){
        res.status(400).send(error.message);
        console.log(error.message);
    }
}

module.exports = {
    createBoard,getBoard,getAllBoard,patchBoardState
}