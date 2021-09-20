const Joi = require('joi');
module.exports = {
    signUpValid:{
        body:Joi.object().required().keys({
            userName: Joi.string().required().messages({
                "string.empty":"you have to enter the name"
            }),
            email:Joi.string().email().required().messages({
                "string.email":"this is wrong email"
            }),
            password:Joi.string().required().messages({
                "string.empty":"this is wrong pass"
            }),
            phone:Joi.string().required().messages({
                "string.empty":"you have to enter the phone"
            }),
            location:Joi.string().required().messages({
                "string.empty":"you have to enter the location"
            }),
            isAuth:Joi.boolean()
        })
    },
    signInValid :{
        body:Joi.object().required().keys({
            email:Joi.string().email().required().messages({
                "string.email":"this is wrong email"
            }),
            password: Joi.string().required().messages({
                "string.empty":"you have to enter the password"
            }),
        })

    },
    updateProfileValid:{
        body:Joi.object().required().keys({
            userName: Joi.string().required().messages({
                "string.empty":"you have to enter the name"
            }),
            phone:Joi.string().required().messages({
                "string.empty":"you have to enter the phone"
            }),
            location:Joi.string().required().messages({
                "string.empty":"you have to enter the location"
            }),
        })
    },
    updatePasswordValid:{
        body:Joi.object().required().keys({
            oldPassword:Joi.string().required().messages({
                "string.empty":"you have to enter the new password"
            }),
            password:Joi.string().required().messages({
                "string.empty":"you have to enter the new password"
            }),
        })

    }

}