const { User } = require('../models/user-schema');

const createUser = async (requestBody) => {

const user = new User(requestBody);
await user.save();
return user;
}

module.exports = {
    createUser
};