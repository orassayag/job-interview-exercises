const Joi = require('joi');

module.exports = {
    // GET: /record/getHistory
    getHistory: {
        query: Joi.object({
            coin: Joi.string().required(),
            top: Joi.number().required()
        })
    }
};