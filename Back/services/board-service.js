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
const patchBoard = async (requestBody) => {
    try{
        const board = await Board.findByIdAndUpdate(requestBody.id, requestBody.state);
        return board;

    }catch{
        throw new Error(error.message);
    }
}

module.exports = {
    createBoard
};