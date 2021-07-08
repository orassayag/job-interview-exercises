const httpStatus = require('http-status');
const logger = require('../services/logger.service');
const database = require('../services/database.service');
const sender = require('../services/sender.service');

/*
   Notice: In the real world it would not be a REST API, but maybe a websocket, it's all
   depend on the traffic you want to show to show on the UI, how intensive the data
   data transfer is, if you need to see each second new treatment of the emails,
   you will probably want to do it by socket.io (or similar), but if  you need
   to show the latest treatments every couple of minutes, a REST API is a good way.
*/

// Create the schedule processes.
module.exports.createScheduleProcess = async (req, res) => {
    try {
        let { timestamp } = req.query;
        if (timestamp) {
            timestamp = parseInt(timestamp);
        } else {
            timestamp = new Date().getTime();
        }
        // Create a schedule processes for specific timestamp.
        const scheduleProcesses = database.createScheduleProcesses(timestamp);
        // Random treat for each email created for this schedule process by the queue.
        await sender.treatScheduleProcesses(scheduleProcesses);
        res.send('OK');
    } catch (error) {
        logger.error(error.stack || error);
        res.status(httpStatus.BAD_REQUEST);
    }
    return res;
};