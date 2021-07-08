const express = require('express');
const { validate } = require('express-validation');
const { create } = require('../../validations/schedule.validation');
const scheduleController = require('../../controllers/schedule.controller');

const router = express.Router();

router.route('/create').get(validate(create), scheduleController.createScheduleProcess);

module.exports = router;