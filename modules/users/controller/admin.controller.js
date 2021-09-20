const User = require("../model/users.model")
const advertising = require("../model/advertising.model")
const blogs = require("../../blogs/model/blogs.model")
const reports = require("../../blogs/model/report.model")

const {StatusCodes} = require("http-status-codes")
const bcrypt = require("bcrypt");
const saltRounds = 5;




const getUsersList = async(req,res)=>{
    console.log("getUsersList")
    let data=[];
    try{
        if (req.user.role == "superAdmin"||req.user.role == "admin"){
            data = await User.find({role:"user"}).select("-password")
            res.status(StatusCodes.OK).json({message:"all users",data})
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"you are not authorized"})
        }
    }catch{
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrong"})
        }
}

const createAdvertising = async(req,res)=>{
    console.log("createAdvertising")
    const { title, description,isEnabeled} = req.body;
    try{
        if (req.user.role == "superAdmin"||req.user.role == "admin"){
            await advertising.insertMany({ title, description, isEnabeled})
            res.status(StatusCodes.OK).send("advertising is created successfully")
            
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"you are not authorized"})
        }

    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrong"})
    }
}

const getAllAdvertising = async(req,res)=>{
    console.log("getAllAdvertising")
    let data=[];
    try{
        if (req.user.role == "superAdmin"||req.user.role == "admin"){
            data = await advertising.find({})
            res.status(StatusCodes.OK).json({message:"all ads",data})
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"you are not authorized"})
        }
    }catch{
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrong"})
        }
}
const updateAdvertising = async(req,res)=>{
    console.log("updateAdvertising")
    const id = req.params.id
    const { title, description,isEnabeled} = req.body;
    try{
        if (req.user.role == "superAdmin"||req.user.role == "admin"){
            const data = await advertising.findOne({_id:id})
            if(data){
                await advertising.updateOne({ _id: id }, { title, description ,isEnabeled}).then(() => {
                res.status(StatusCodes.OK).send("advertising is updated successfully")})
                
            }else{
                res.status(StatusCodes.BAD_REQUEST).json({message:"advertising not found"})
            }
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"you are not authorized"})
        }

    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrong"})
    }
}
const deleteAdvertising = async(req,res)=>{
    console.log("deleteAdvertising")
    const id = req.params.id
    try{
        if (req.user.role == "superAdmin"||req.user.role == "admin"){
            const data = await advertising.findOne({_id:id})
            if(data){
                await advertising.deleteOne({_id:id}).then(()=> {
                res.status(StatusCodes.OK).send("advertising is deleted")})
                
            }else{
                res.status(StatusCodes.BAD_REQUEST).json({message:"advertising not found"})
            }
         
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"you are not authorized"})
        }

    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrong"})
    }
}
const getAllBlogs = async(req,res)=>{
    console.log("getAllBlogs")
    let data=[];
    try{
        if (req.user.role == "superAdmin"||req.user.role == "admin"){
            data = await blogs.find({})
            res.status(StatusCodes.OK).json({message:"all blogs",data})
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"you are not authorized"})
        }
    }catch{
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrong"})
        }
}
const reviewReport = async(req,res)=>{
    console.log("reviewReport")
    let data=[];
    try{
        if (req.user.role == "superAdmin"||req.user.role == "admin"){
            data = await reports.find({})
            res.status(StatusCodes.OK).json({message:"all reports",data})
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"you are not authorized"})
        }
    }catch{
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrong"})
        }
}
const blockUser = async(req,res)=>{
    res.send("blockUser")
    const id = req.params.id
    try{
        if (req.user.role == "superAdmin"||req.user.role == "admin"){
            const data = await User.findOne({_id:id})
            if(data){
                await User.updateOne({ _id: id }, {isBlocked:true}).then(() => {
                res.status(StatusCodes.OK).send("user is blocked successfully")})
                
            }else{
                res.status(StatusCodes.BAD_REQUEST).json({message:"user not found"})
            }
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"you are not authorized"})
        }

    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrong"})
    }

}

module.exports ={getUsersList, createAdvertising,getAllAdvertising,
    updateAdvertising,deleteAdvertising,
    getAllBlogs,reviewReport,blockUser
}