const ON_DEATH = require('death')({ SIGHUP: true });
const logger = require('./logger.service');

module.exports = {
    errorHandler() {
        process.on('uncaughtException', (error) => {
            logger.error(error.stack || error);
        });
        process.on('unhandledRejection', (reason, promise) => {
            logger.error(reason.stack || reason);
            logger.error(promise);
        });
        process.on('message', (message) => {
            if (message === 'shutdown') {
                logger.info('Closing all connections.');
                setTimeout(() => {
                    logger.info('Finished closing connections.');
                }, 1500);
            }
        });
        process.on('SIGTERM', () => {
            logger.info('SIGTERM');
        });
        process.on('SIGINT', () => {
            logger.info('SIGINT');
        });
        process.on('exit', () => {
            logger.info('exit');
        });
        ON_DEATH((signal, error) => {
            logger.error('ON_DEATH');
            logger.info(signal);
            logger.info(error);
        });
    }
};