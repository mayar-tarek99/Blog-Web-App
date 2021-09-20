const blogs = require("../model/blogs.model")
const reports = require("../model/report.model")
const {StatusCodes} = require("http-status-codes")



const getProfileBlogs = async(req,res)=>{
    console.log("getProfileBlogs")
    let data=[];
    try{
        if (req.user.isAuth == true){
            data = await blogs.find({userId:req.user._id})
            res.status(StatusCodes.OK).json({message:"profile blogs",data})
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"you must log in first"})
        }
    }catch{
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrong"})
        }

}

const createBlog = async(req,res)=>{
    console.log("createBlog")
    const { title, description} = req.body;
    try{
        if (req.user.isAuth == true){
            await blogs.insertMany({ title, description, userId:req.user._id,isBlocked:false})
            res.status(StatusCodes.OK).send("blog is created successfully")
            
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"you must log in first"})
        }

    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrong"})
    }

}

const updateBlog = async(req,res)=>{
    console.log("updateBlog")
    const id = req.params.id
    console.log(id);
    const { title, description} = req.body;
    try{
        if (req.user.isAuth == true){
            const data = await blogs.findOne({_id:id})
            if(data){
                await blogs.updateOne({ _id: id }, { title, description}).then(() => {
                res.status(StatusCodes.OK).send("blog is updated successfully")})
                
            }else{
                res.status(StatusCodes.BAD_REQUEST).json({message:"blog not found"})
            }
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"you must log in first"})
        }

    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrong"})
    }

}

const deleteBlog = async(req,res)=>{
    console.log("deleteBlog")
    const id = req.params.id
    console.log(id);
    try{
        if (req.user.isAuth == true){
            const data = await blogs.findOne({_id:id})
            if(data){
                await blogs.deleteOne({_id:id}).then(()=> {
                res.status(StatusCodes.OK).send("blog is deleted")})
                
            }else{
                res.status(StatusCodes.BAD_REQUEST).json({message:"blog not found"})
            }
         
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"you must log in first"})
        }

    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrong"})
    }

}

const viewNewsFeed = async(req,res)=>{
    console.log("viewNewsFeed")
    let data=[];
    try{
        if (req.user.isAuth == true){
            data = await blogs.find({isBlocked:false}).select("-isBlocked")
            res.status(StatusCodes.OK).json({message:"news feed",data})
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"you must log in first"})
        }
    }catch{
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrong"})
        }

}

const reportBlog = async(req,res)=>{  
    console.log("reportBlog")
    const blogId = req.params.id
    const userId = req.user._id
    const comment = req.body.comment;

    try{
        if (req.user.isAuth == true){
            await reports.insertMany({ comment, userId:userId,blogId:blogId})
            res.status(StatusCodes.OK).send("report is created successfully")
            
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"you must log in first"})
        }

    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrong"})
    }

}

const blockBlog = async(req,res)=>{
    console.log("blockBlog")
    const id = req.params.id
    try{
        if (req.user.role == "superAdmin"||req.user.role == "admin"){
            const data = await blogs.findOne({_id:id})
            if(data){
                await blogs.updateOne({ _id: id }, {isBlocked:true}).then(() => {
                res.status(StatusCodes.OK).send("blog is blocked successfully")})
                
            }else{
                res.status(StatusCodes.BAD_REQUEST).json({message:"blog not found"})
            }
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"you are not authorized"})
        }

    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrong"})
    }


}

module.exports ={getProfileBlogs,createBlog,updateBlog,deleteBlog,viewNewsFeed,reportBlog,blockBlog}