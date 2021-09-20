const mongoose = require("mongoose");

const reportSchema =new mongoose.Schema({
    comment: {type : String, required: true},
    userId:mongoose.Schema.Types.ObjectId ,
    blogId:mongoose.Schema.Types.ObjectId  
})

module.exports = reportSchema