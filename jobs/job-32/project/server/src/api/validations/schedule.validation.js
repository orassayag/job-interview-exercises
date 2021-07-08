const Joi = require('joi');

module.exports = {
    // GET: /schedule/create
    create: {
        query: Joi.object({
            top: Joi.string().custom((value, helper) => {
                if (!(new Date(value.timestamp)).getTime() > 0) {
                    return helper.message('Invalid timestamp');
                }
                return true;
            })
        })
    }
};