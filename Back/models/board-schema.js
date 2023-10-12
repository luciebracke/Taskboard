const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
    users:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    task:[{
        title:{type:String, required:true},
        description:{type:String, required:true},
        state:{type:String, required:true},
        priority:{type:String, required:true}
    }],
});

const Board = mongoose.model('Board', BoardSchema);


module.exports = {Board};