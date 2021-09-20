const mongoose = require("mongoose");

const advertisingSchema = require("../schema/advertising.schema");


const advertisingModel = mongoose.model("advertising", advertisingSchema)

module.exports = advertisingModel