const { User } = require('../models/user-schema');
const bcrypt = require('bcrypt');

const getAllUsers = async () => {

    try {

        let users = await User.find();
        return users;
    }
    catch (error) {
        throw new Error(error.message);
    }
};

/********************************************************************************/

const createUser = async (requestBody) => {

    try {

        //What's expected to be in the body of the request
        const { email, password } = requestBody;

        if (!email || !password) {
            throw new Error('Not all fields have been entered!');
        }

        //checks if password has the correct length
        if (password < 6) {
            throw new Error('Password must have at least 6 characters!');
        }

        //checks if email is already in use in the database
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            throw new Error('An account with this email already exists!');
        }

        //hashes the password
        /*Hash algorithms always produce the same result for a specific password, 
          the genSalt method adds security by creating randomness to the password hash*/
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ email, password: hashedPassword });
        await user.save();
        return user;

    }
    catch (error) {
        throw new Error(error.message);
    }
}

/********************************************************************************/

const updateUser = async (req) => {

    try {
       let user = User.findOneAndUpdate({_id: req.params.id}, req.body, { new: true });
       return user;
    }
    catch (error) {
        throw new Error(error.message);
    }

};

/********************************************************************************/

const deleteUser = async (req) => {

    try {

        let user = User.findByIdAndRemove(req.params.id);
        return user;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
};