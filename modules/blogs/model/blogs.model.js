const mongoose = require("mongoose");


const blogSchema = require("../schema/blogs.schema");


const blogModel = mongoose.model("blog", blogSchema);

module.exports = blogModel;