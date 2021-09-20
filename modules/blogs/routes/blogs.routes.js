const app = require("express").Router();

const isAuthorized = require("../../../config/isAuthorized")

const validator = require("../../../validator/common.validate")

const {createBlogValid,updateBlogValid,deleteBlogValid,reportBlogValid,blockBlogValid} = require("../joi/blogs.validation")

const {getProfileBlogs,createBlog,updateBlog,deleteBlog,viewNewsFeed,reportBlog,blockBlog} = require("../controller/blogs.controller")

app.get("/getProfileBlogs",isAuthorized(),getProfileBlogs)
app.post("/createBlog",isAuthorized(),validator(createBlogValid),createBlog)
app.put("/updateBlog/:id",isAuthorized(),validator(updateBlogValid),updateBlog)
app.delete("/deleteBlog/:id",isAuthorized(),validator(deleteBlogValid),deleteBlog)
app.get("/viewNewsFeed",isAuthorized(),viewNewsFeed)
app.post("/reportBlog/:id",isAuthorized(),validator(reportBlogValid),reportBlog)
app.post("/blockBlog/:id",isAuthorized(),validator(blockBlogValid),blockBlog)



module.exports = app
