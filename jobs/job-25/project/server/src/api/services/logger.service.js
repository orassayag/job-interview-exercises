const winston = require('winston');
const { env } = require('../../config/vars.config');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        // Write all logs error (and below) to the 'error.log' file.
        new winston.transports.File({ filename: 'errors/error.log', level: 'error' }),
        // Write to all logs with level 'info' and below to the 'combined.log' file.
        new winston.transports.File({ filename: 'errors/combined.log' })
    ]
});

// If we're not in production then log to the console with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest })`
if (env === 'development') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

// Initiate the stream logger.
logger.stream = {
    write: (message) => {
        this.logger.info(message.trim());
    }
};

module.exports = logger;