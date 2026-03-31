// Set Bluebird promise to be the default promise (faster).
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const logger = require('./api/services/logger.service');
require('./api/services/error.service').errorHandler();
const { port, env } = require('./config/vars.config');
const app = require('./api/services/express.service');
const { socketConnect } = require('./api/services/socket.service');
const database = require('./api/services/database.service');
const queue = require('./api/services/queue.service');
const sender = require('./api/services/sender.service');

// Initiate the server.
const server = app.listen(3001, () => logger.info(`Server started on port ${port} in ${env}.`));

// Initiate the database.
database.initiate();

// Open the Socket connection.
const io = socketConnect(server);

// Initiate the sender.
sender.initiate(io);

// Initiate the queue.
queue.initiate(sender.treatEmail.bind(sender));

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
    // Close the Socket connection.
    io.close();
};
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

module.exports = app;

/*
  ToDo: Need to stabilize the server. After a few moments without
  activity it not responding to the calls from the client.
*/