const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    important:{
        type:boolean,
        default:false
    },
    complete:{
        type:boolean,
        default:false
    }
},{timestamps:true})

const Task = mongoose.model("Task",taskSchema)
module.exports = Task;
