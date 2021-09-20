const User = require("../model/users.model")
const {StatusCodes} = require("http-status-codes")


const getAdminList = async(req,res)=>{
    console.log("getAdminList")
    let data=[];
    try{
        if (req.user.role == "superAdmin"){
            data = await User.find({role:"admin"}).select("-password")
            res.status(StatusCodes.OK).json({message:"all admins",data})
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"you are not authorized"})
        }
    }catch{
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrong"})
        }
    }
   

const addAdmin = async(req,res)=>{
    console.log("addAdmin")
    const { userName, email, password, phone,location,role} = req.body;
    try{
        if (req.user.role == "superAdmin"){
            const userValid = await User.findOne({email:email})
            if(userValid){
                res.status(StatusCodes.BAD_REQUEST).json({message:"this email already added"})
            }else{
                let newUser = new User({
                    userName: `${userName}`,email: `${email}`,password: `${password}`,
                    phone: `${phone}`, location: `${location}`,role:`${role}`
                    })
            
                await newUser.save()
                res.status(StatusCodes.OK).send("admin is added successfully")
            }
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"you are not authorized"})
        }

    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrong"})
    }
       
}

const deleteAdmin = async(req,res)=>{
    console.log("deleteAdmin")
    const {email} = req.body;
    try{
        if (req.user.role == "superAdmin"){
            const userValid = await User.findOne({email:email})
            if(userValid){
                await User.deleteMany({ email: email,role:"admin"})
                res.status(StatusCodes.OK).json({message:"admin is deleted successfully"})
            }else{
                res.status(StatusCodes.BAD_REQUEST).send("the email you have entered doesn't exist")
            }
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"you are not authorized"})
        }

    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrong"})
    }
}

module.exports ={getAdminList,addAdmin,deleteAdmin}