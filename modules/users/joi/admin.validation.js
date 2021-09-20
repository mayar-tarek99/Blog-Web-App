
    const Joi = require('joi');
    module.exports = {
        createAdvertisingValid:{
            body:Joi.object().required().keys({
                title:Joi.string().required().messages({
                    "string.empty":"enter title"
                }),
                description:Joi.string().required().messages({
                    "string.empty":"enter description"
                }),
                isEnabeled:Joi.boolean().default(true)
            })
        },
        updateAdvertisingValid:{
            params:Joi.object().required().keys({
                id:Joi.string().required().messages({
                    "string.empty":"enter id"
                }),
            }),
            body:Joi.object().required().keys({
                title:Joi.string().required().messages({
                    "string.empty":"enter title"
                }),
                description:Joi.string().required().messages({
                    "string.empty":"enter description"
                }),
                isEnabeled:Joi.boolean().default(true)
            })
        },
        deleteAdvertisingValid:{
            params:Joi.object().required().keys({
                id:Joi.string().required().messages({
                    "string.empty":"enter id"
                }),
            }),
        },
       
        blockUserValid:{
            params:Joi.object().required().keys({
                id:Joi.string().required().messages({
                    "string.empty":"enter id"
                }),
            }),
        }
    }