const httpStatus = require('http-status');
const logger = require('../services/logger.service');
const CommentModel = require('../models/comment.model');

// Get latest top comments.
exports.getComments = async (req, res) => {
    try {
        const data = await CommentModel.find({})
            .limit(parseInt(req.query.top, 10))
            .sort('-created_at');
        res.status(httpStatus.OK);
        res.json(data);
    } catch (error) {
        logger.error(error.stack || error);
        res.status(httpStatus.BAD_REQUEST);
    }
    return res;
};

// Creates a new comment.
exports.create = async (req, res) => {
    try {
        await new CommentModel(req.body).save();
        res.status(httpStatus.CREATED);
        res.json('OK');
    } catch (error) {
        logger.error(error.stack || error);
        res.status(httpStatus.BAD_REQUEST);
    }
    return res;
};