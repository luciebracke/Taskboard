const userService = require('../services/user-service');

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

module.exports = {
    createUser
}