// Set Bluebird promise to be the default promise.
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const logger = require('./api/services/logger.service');
require('./api/services/error.service').errorHandler();
const { port, env, intervalMilliseconds } = require('./config/vars.config');
const mongoose = require('./api/services/mongoose.service');
const app = require('./api/services/express.service');
const { socketConnect } = require('./api/services/socket.service');
const recordController = require('./api/controllers/record.controller');

// Open the Mongoose connection.
mongoose.connect();

// Initiate the server.
const server = app.listen(3001, () => logger.info(`Server started on port ${port} in ${env}.`));

// Open the Socket connection.
const io = socketConnect(server);

// Active the interval reccord controller.
const recordsInterval = setInterval(() => {
    recordController.createRecordRound(io);
}, intervalMilliseconds);

// Setting gracefully shutting down in case of error.
const shutDown = () => {
    // Close the express server.
    logger.info('Received kill signal, shutting down gracefully.');
    server.close(() => {
        logger.info('Closed out remaining connections.');
        process.exit(0);
    });
    setTimeout(() => {
        logger.error('Could not close connections in time, forcefully shutting down.');
        process.exit(1);
    }, 10000);
    // Close the MongoDB connection.
    mongoose.closeConnection();
    // Clear the interval.
    clearInterval(recordsInterval);
    // Close the Socket connection.
    io.close();
};
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

module.exports = app;