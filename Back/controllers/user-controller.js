const userService = require('../services/user-service');

const getAllUsers = async (req, res) => {

    let returnedResponse;

    try {
        returnedResponse = await userService.getAllUsers();
        res.status(200).send(returnedResponse);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
};

/********************************************************************************/ 

const createUser = async (req, res) => {

    let returnedResponse;
    let requestBody = req.body;

    try {
        returnedResponse = await userService.createUser(requestBody);
        res.status(201).send(returnedResponse);
    } 
    catch (error) {
        res.status(400).send(error.message);
    }
}

/********************************************************************************/ 

const updateUser = async (req, res) => {
    
        let returnedResponse;
    
        try {
            returnedResponse = await userService.updateUser(req);
            res.status(201).send(returnedResponse);
        } 
        catch (error) {
            res.status(400).send(error.message);
        }
}

/********************************************************************************/ 

const deleteUser = async (req, res) => {
    
        let returnedResponse;
    
        try {
            returnedResponse = await userService.deleteUser(req);
            res.status(201).send(returnedResponse);
        } 
        catch (error) {
            res.status(400).send(error.message);
        }
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}