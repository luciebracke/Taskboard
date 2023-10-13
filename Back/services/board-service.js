const { Board } = require('../models/board-schema');

const createBoard = async (requestBody) => {
try {
    const board = new Board(requestBody);
    await board.save();
    return board;
} catch (error) {
    throw new Error(error.message);
    
}
}
const patchBoardState = async (requestBody,res) => {
    try{
        const board = await Board.findByIdAndUpdate(requestBody.id, requestBody.state);
        return board;
    }catch(error){
        throw new Error(error.message);
    }
}

const getAllBoard = async () => {
    try{
        const board = await Board.find();
        return board;
    }catch(error){
        throw new Error(error.message);
    }
}

module.exports = {
    createBoard,getAllBoard,patchBoardState
};