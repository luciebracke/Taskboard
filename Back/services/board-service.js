const { request } = require('express');
const { Board } = require('../models/board-schema');
const mongoose = require('mongoose');
const createBoard = async (requestBody) => {
try {
    const board = new Board(requestBody);
    await board.save();
    return board;
} catch (error) {
    throw new Error(error.message);
    
}
}
const createtask = async (requestBody,res) => {

    try {
        const { boardid,description,state,priority } = requestBody;
        const board = await Board.findById(boardid);
        if (!board) {
            return res.status(404).json({ error: 'Tableau non trouvé' });
        }
        const newTask = {
            title: "titre",
            description: description,
            state: state,
            priority: priority
        };
        board.task.push(newTask);
        await board.save();

        if (res) {
            return res.status(200).json(board);
        }
    } catch (error) {
        console.error(error);
        if (res) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
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
const patchTask = async (requestBody, res) => {

        
        const { boardid,taskid,description } = requestBody;
        try{
       
        let updatedBoard = await Board.findOneAndUpdate(
            { _id: boardid, 'task._id': taskid },
            { $set: { 'task.$.description': description } },
            { new: true }
          );
      
          if (updatedBoard) {
            console.log('Task description updated successfully:', updatedBoard);
            if(res){
                return res.status(200).json(updatedBoard);
            }
            console.log(updatedBoard);
          } else {
          
            if(res){
                return res.status(404).json({ error: 'Task not found' });
            }
            console.log({ error: 'Task not found' });
          }
        } catch (error) {
            if(res){
                return res.status(500).json({ error: 'Internal Server Error' });
            }
          console.error('Error updating task description:', error);
         
        }
     
/* 
        const taskToUpdate = board.task.id(taskId);

       
        if (!taskToUpdate) {
            return res.status(404).json({ error: 'Tache non trouvée ' });
        }

       
        if (title) taskToUpdate.title = title;
        if (description) taskToUpdate.description = description;
        if (state) taskToUpdate.state = state;
        if (priority) taskToUpdate.priority = priority;

    
        await board.save();

        return res.status(200).json(board); // Return the updated board with the updated task
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    } */
};

const deleteTask = async (requestBody, res) => {
    try {
        console.log(requestBody);
        const { boardid, taskid } = requestBody;
        const board = await Board.findById(boardid);

        if (!board) {
            return res.status(404).json({ error: 'Tableau non trouvé' });
        }

              
              const taskIndex = board.task.findIndex(task => task._id.toString() === taskid);     
              if (taskIndex === -1) {
                  return res.status(404).json({ error: 'Tache non trouvée' });
              }  
              board.task = board.task.filter(task => task._id.toString() !== taskid);
              await board.save();
      
              if (res) {
                return res.status(200).json(board);
            }
          } catch (error) {
              console.error(error);
              if (res) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
          }
};
const getAllBoard = async () => {
    try{
        const board = await Board.find();
        return board;
    }catch(error){
        throw new Error(error.message);
    }
}

module.exports = {
    createBoard,getAllBoard,patchBoardState,patchTask,deleteTask,createtask
};