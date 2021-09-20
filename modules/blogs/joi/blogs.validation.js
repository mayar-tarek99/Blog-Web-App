const Joi = require('joi');
module.exports = {
    createBlogValid :{
        body:Joi.object().required().keys({
            title:Joi.string().required().messages({
                "string.empty":"enter title"
            }),
            description:Joi.string().required().messages({
                "string.empty":"enter description"
            }),
            isBlocked:Joi.boolean()
        })

    },
    updateBlogValid:{
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
        })
    },
    deleteBlogValid:{
        params:Joi.object().required().keys({
            id:Joi.string().required().messages({
                "string.empty":"enter id"
            }),
        }),
        
    },
    reportBlogValid:{
        params:Joi.object().required().keys({
            id:Joi.string().required().messages({
                "string.empty":"enter id"
            }),
        }),
        body:Joi.object().required().keys({
            comment:Joi.string().required().messages({
                "string.empty":"enter comment"
            }),
        }),
        
    },
    blockBlogValid:{
        params:Joi.object().required().keys({
            id:Joi.string().required().messages({
                "string.empty":"enter id"
            }),
        }),
        
    },


}