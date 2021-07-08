const express = require('express');
const { validate } = require('express-validation');
const { create, getComments } = require('../../validations/comment.validation');
const commentController = require('../../controllers/comment.controller');

const router = express.Router();

router.route('/getComments').get(validate(getComments), commentController.getComments);
router.route('/create').post(validate(create), commentController.create);

module.exports = router;