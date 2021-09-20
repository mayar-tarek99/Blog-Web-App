const app = require("express").Router();

const isAuthorized = require("../../../config/isAuthorized")

const validator = require("../../../validator/common.validate")
const {signUpValid,signInValid,updateProfileValid,updatePasswordValid} = require("../joi/user.validation")
const {addAdminValid,deleteAdminValid} = require("../joi/superAdmin.validation")
const {createAdvertisingValid,updateAdvertisingValid,deleteAdvertisingValid,blockUserValid}=require("../joi/admin.validation")


const {signUp,signIn, updateProfile, updatePassword,viewAds,deactivateAccount} = require("../controller/user.controller")
const {getAdminList,addAdmin,deleteAdmin} = require("../controller/superAdmin.controller")
const {getUsersList, createAdvertising,getAllAdvertising,updateAdvertising,deleteAdvertising,
      getAllBlogs,reviewReport,blockUser} = require("../controller/admin.controller")
 


app.post("/signUp",validator(signUpValid),signUp)
app.post("/signIn",validator(signInValid),signIn)
app.put("/updateProfile",isAuthorized(),validator(updateProfileValid),updateProfile)
app.put("/updatePassword",isAuthorized(),validator(updatePasswordValid),updatePassword)
app.get("/viewAds",viewAds)
app.get("/deactivateAccount",isAuthorized(),deactivateAccount)


app.get("/getAdminList",isAuthorized(),getAdminList)
app.post("/addAdmin",isAuthorized(),validator(addAdminValid),addAdmin)
app.delete("/deleteAdmin",isAuthorized(),validator(deleteAdminValid),deleteAdmin)

app.get("/getUsersList",isAuthorized(),getUsersList)
app.post("/createAdvertising",isAuthorized(),validator(createAdvertisingValid) ,createAdvertising)
app.get("/getAllAdvertising",isAuthorized(),getAllAdvertising)
app.put("/updateAdvertising/:id",isAuthorized(),validator(updateAdvertisingValid),updateAdvertising)
app.delete("/deleteAdvertising/:id",isAuthorized(),validator(deleteAdvertisingValid),deleteAdvertising)
app.get("/getAllBlogs",isAuthorized(),getAllBlogs)
app.get("/reviewReport",isAuthorized(),reviewReport)
app.post("/blockUser/:id",isAuthorized(),validator(blockUserValid),blockUser)



module.exports = app
