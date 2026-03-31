const mongoose = require('mongoose');
const logger = require('./logger.service');
const { mongo, env } = require('../../config/vars.config');

// Set mongoose Promise to the Bluebird promise.
mongoose.Promise = Promise;

// Exit the application in case on Mongo error.
mongoose.connection.on('error', (error) => {
    logger.error(`MongoDB connection error: ${error.stack || error}.`);
    process.exit(-1);
});

// Print the Mongoose logs in development environment.
if (env === 'development') {
    mongoose.set('debug', true);
}

// The connect function.
const connect = async () => {
    // Connect to the MongoDB.
    const connection = await mongoose.connect(mongo.uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        poolSize: 20,
        socketTimeoutMS: 480000,
        keepAlive: 300000,
        ssl: false,
        sslValidate: false
    }).catch((error) => {
        logger.error(`Failed to connect to MongoDB: ${error.stack || error}.`);
    });
    if (!connection) {
        logger.error('Failed to connect to MongoDB: connection is null or empty.');
    }
    logger.info(`MongoDB connected on: ${mongo.uri}.`);
    return connection;
};

const closeConnection = () => {
    mongoose.connection.close(() => {
        logger.info('Mongoose disconnected on app termination.');
    });
};

module.exports.closeConnection = closeConnection;
module.exports.connect = connect;