# Blog Application

A backend version of simple blogging web app built using NodeJS, ExpressJS and MongoDb. 
Authorized with jsonwebtoken and Validated with joi.

## APIs

### Super Admin (only) controls
- get admins list
- add admin 
- delete admin

### Admin & Super Admin controls
- get users list
- get all blogs
- CRUD Advertising
- review reports 
- block user
- block blog

### user controls
- signUp
- signIn
- update profile
- update password
- view advertising
- deactivate account
- CRUD profile blogs
- view News feed
- report Blog

## Project Archietecture

```tree
├── app.js
├── config
|   ├── db.config.js
|   └── isAuthorized.js
├── modules
|   ├── blogs
|   |   ├── controller
|   |   |   └── blogs.controller.js 
|   |   ├── joi
|   |   |   └── blogs.validation.js
|   |   ├── model
|   |   |   ├── blogs.model.js
|   |   |   └── report.model.js
|   |   ├── routes
|   |   |   └── blogs.routes.js
|   |   └── schema
|   |       ├── blogs.schema.js
|   |       └── report.schema.js
│   └── users
|       ├── controller
|       |   ├── admin.controller.js
|       |   ├── superAdmin.controller.js
|       |   └── user.controller.js 
|       ├── joi
|       |   ├── admin.validation.js
|       |   ├── superAdmin.validation.js
|       |   └── user.validation.js 
|       ├── model
|       |   ├── advertising.model.js
|       |   └── users.model.js
|       ├── routes
|       |   └── users.routes.js
|       └── schema
|           ├── advertising.schema.js
|           └── users.schema.js
├── node_modules
├── validator
|   └─ common.validate.js
├── .env
├── package.json 
├── package-lock.json
├── readme.md

```

# How to run

- Git clone repository
- Then run these commands in terminal/shell

```npm
    npm install
    npm start
```
