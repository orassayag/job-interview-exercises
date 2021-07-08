const express = require('express');
const commentRoute = require('./files/comment.route');
const recordRoute = require('./files/record.route');

const router = express.Router();

// Test the status to verify if online and working.
router.get('/status', (req, res) => {
    res.status(200).send('OK');
});

// Set all the routes.
router.use('/comment', commentRoute);
router.use('/record', recordRoute);

module.exports = router;