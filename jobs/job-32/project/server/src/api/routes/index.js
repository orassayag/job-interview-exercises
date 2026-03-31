const express = require('express');
const scheduleRoute = require('./files/schedule.route');

const router = express.Router();

// Test the status to verify if online and working.
router.get('/status', (req, res) => {
    res.status(200).send('OK');
});

// Set all the routes.
router.use('/schedule', scheduleRoute);

module.exports = router;