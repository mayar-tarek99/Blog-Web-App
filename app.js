//===============================Basic Config================================
const express = require("express");
const app = express();
app.use(express.json());

require("dotenv").config(); 

const connection = require("./config/db.config");
connection()

const path =  require("path")
app.use(express.static(path.join(__dirname , "public")))

//===============================Local Modules===============================

app.use(require("./modules/blogs/routes/blogs.routes"))
app.use(require("./modules/users/routes/users.routes"))

//================================ index Page================================
 app.get("/", (req, res) => {
    res.send("hello")
})

app.listen(process.env.PORT)
