const mongoose = require("mongoose");

const blogsSchema =new mongoose.Schema({
    title: {type: String, required: true},
    description: {type : String, required: true},
    userId:mongoose.Schema.Types.ObjectId ,
    isBlocked:{type: Boolean, default:false} 
})

module.exports = blogsSchema