const express = require('express');
const { validate } = require('express-validation');
const { getHistory } = require('../../validations/record.validation');
const recordController = require('../../controllers/record.controller');

const router = express.Router();

router.route('/getHistory').get(validate(getHistory), recordController.getHistory);

module.exports = router;