const Joi = require('joi');
module.exports = {
    addAdminValid :{
        body:Joi.object().required().keys({
            userName:Joi.string().required().messages({
                "string.empty":"enter name"
            }),
            email:Joi.string().email().required().messages({
                "string.email":"this is wrong email"
            }),
            password:Joi.string().required().messages({
                "string.empty":"enter password"
            }),
            phone:Joi.string().required().messages({
                "string.empty":"enter phone"
            }),
            location:Joi.string().required().messages({
                "string.empty":"enter location"
            }),
            role:Joi.string().required().messages({
                "string.empty":"enter role"
            }),
        })

    },
    deleteAdminValid:{
        body:Joi.object().required().keys({
            email:Joi.string().email().required().messages({
                "string.email":"this is wrong email"
            }),
        })
    }

}