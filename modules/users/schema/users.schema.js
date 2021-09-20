const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const saltRounds = 5;

const userSchema = new mongoose.Schema({
  userName: { type: String,  required: true},
  email: { type: String, required: true },
  password: { type: String, required: true},
  phone:{type: String, required: true},
  location:{type: String, required: true},
  role:{type: String,default: "user"},
  isAuth:Boolean,
  isBlocked:{type: Boolean, default:false} 
});


userSchema.pre("save",async function(next){
  console.log(this.password)
  this.password = await bcrypt.hash(this.password, saltRounds)
  next()
})

// userSchema.post("find",function(res){
//   console.log("hello from hook post");
// })

module.exports = userSchema