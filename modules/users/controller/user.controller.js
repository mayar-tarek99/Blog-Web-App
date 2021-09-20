const User = require("../model/users.model")
const advertising = require("../model/advertising.model")
const {StatusCodes} = require("http-status-codes")

const bcrypt = require("bcrypt");
const saltRounds = 5;
var jwt = require('jsonwebtoken');

const signUp = async(req,res)=>{
    console.log("signUp")
    const { userName, email, password, phone,location} = req.body;
    try {
        const user = await User.findOne({email:email})
        if(user){
            res.status(StatusCodes.BAD_REQUEST).json({message:"this email already registered"})
        }else{
             let newUser = new User({
                    userName: `${userName}`,email: `${email}`,password: `${password}`, 
                    phone: `${phone}`, location: `${location}` , isAuth : false ,isBlocked: false})
                await newUser.save()
                res.status(StatusCodes.OK).send("signUp success")
            }
            
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrong"})
    }
}

const signIn = async(req,res)=>{
    console.log("signIn")
    const {email,password} = req.body
    try {
        const userValid = await User.findOne({email})
        if (!userValid){
            res.status(StatusCodes.BAD_REQUEST).json({message:"you should register first"})
        }else{
            const match = await bcrypt.compare(password, userValid.password);
            if(match) {
                console.log(userValid.role)
                let token = jwt.sign({ role: userValid.role , isAuth : true,_id:userValid._id}, "shhhhh");
                res.status(StatusCodes.OK).json({message:"welcome",token})
            }else{
                res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({message:"this password is invalid"})
            }
            
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrong"})
    }
}

const updateProfile = async(req,res)=>{
    console.log("updateProfile")
    const { userName,phone,location} = req.body;
    try {
        if (req.user.isAuth == true){
            const user = await User.findOne({_id:req.user._id})
            if(user){
                await User.updateOne({_id:req.user._id},{userName: `${userName}`,phone: `${phone}`,location: `${location}`})
                res.status(StatusCodes.OK).send("profile is updated")
            }else{
                res.status(StatusCodes.BAD_REQUEST).json({message:"this email is not registered"})
               }
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"you must log in first"})
        }
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrong"})
    }
}

const updatePassword = async(req,res)=>{
    console.log("updatePassword")
    const { oldPassword,password } = req.body;
    try {
        if (req.user.isAuth == true){
            const user = await User.findOne({_id:req.user._id})
            if(user){
                const match = await bcrypt.compare(oldPassword, user.password);
                if(match){
                    let hashed_password = await bcrypt.hash(password, saltRounds)
                    await User.updateOne({email:user.email},{password: hashed_password})
                    res.status(StatusCodes.OK).send("password is updated")
                }
                
            }else{
                res.status(StatusCodes.BAD_REQUEST).json({message:"wrong password"})
            }
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"you must log in first"})
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrong"})
    }
}

const viewAds = async(req,res)=>{
    console.log("viewAds");
    let data=[];
    try{
        data = await advertising.find({isEnabeled:true})
        res.status(StatusCodes.OK).json({message:"enabeled ads",data})
    }catch{
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrong"})
        }
}

const deactivateAccount = async(req,res)=>{
    console.log("deactivateAccount");
    try{
        if ((req.user.isAuth == true)&& (req.user.role=="user")){
            const data = await User.findOne({_id:req.user._id})
            if(data){
                await User.updateOne({ _id: req.user._id }, {isBlocked:true}).then(() => {
                res.status(StatusCodes.OK).send("your account is deactivated")})
                
            }else{
                res.status(StatusCodes.BAD_REQUEST).json({message:"you must register first"})
            }
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"you must log in first"})
        }

    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrong"})
    }
}



module.exports ={signUp, signIn, updateProfile, updatePassword,viewAds,deactivateAccount}