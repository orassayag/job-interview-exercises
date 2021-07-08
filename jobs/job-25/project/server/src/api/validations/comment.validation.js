const Joi = require('joi');

module.exports = {
    // GET: /comment/getComments
    getComments: {
        query: Joi.object({
            top: Joi.number().required()
        })
    },

    // POST: /comment/create
    create: {
        body: Joi.object({
            username: Joi.string().required().min(1).max(20),
            comment: Joi.string().required().min(1).max(300)
        })
    }
};