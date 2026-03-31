const { createLogger, format, transports } = require('winston');
const { env } = require('../../config/vars.config');

const { combine, timestamp, json, printf } = format;
const LEVEL = Symbol.for('level');
const logsRoot = 'logs';
const isDevelopment = env === 'development';

const logFilter = (level) => {
    return format((info) => {
        if (isDevelopment) {
            console.log(info.message);
        }
        if (info[LEVEL] === level) {
            return info;
        }
    })();
};

const printEmail = (info) => {
    if (info[LEVEL] === info.level) {
        return `${info.timestamp} : ${info.message}`;
    }
};

const logger = createLogger({
    level: 'info',
    format: json(),
    transports: [
        // Write all logs error (and below) to the 'error.log' file.
        new transports.File({ filename: `${logsRoot}/error.log`, level: 'error' }),
        // Write to all logs with level 'info' and below to the 'combined.log' file.
        new transports.File({ filename: `${logsRoot}/combined.log` }),
        // Write to all email reports logs to 'silly' in 'emails-report.log' file.
        new transports.File({
            level: 'silly',
            filename: `${logsRoot}/emails-report.log`,
            format: combine(logFilter('silly'), timestamp(), json(), printf(printEmail))
        })
    ]
});

/*
    ToDo: Add winston-daily-rotate-file NPM package to log 'emails-report.log' files for each day /
          other time interval since it's not a real world scenario to keep all logs in a single log
          file.
*/

// Initiate the stream logger.
logger.stream = {
    write: (message) => { this.logger.info(message.trim()); }
};

module.exports = logger;