const mongoose = require("mongoose");


const advertisingSchema = new mongoose.Schema({
  title: { type: String,  required: true},
  description: { type: String, required: true },
  isEnabeled:{ type: Boolean,  default: true}
});


module.exports = advertisingSchema