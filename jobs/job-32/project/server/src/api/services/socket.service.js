const socketIo = require('socket.io');
const logger = require('./logger.service');

// The connect function.
const socketConnect = (server) => {
    const io = socketIo(server, { cors: { origin: '*' } });
    logger.info(`socketIo connected.`);
    io.on('connection', (socket) => {
        logger.info(`socketIo ${socket.id} connected.`);
        socket.on('disconnect', () => logger.info(`socketIo ${socket.id} disconnected.`));
        socket.on('terminate', (data) => {
            const socketToKill = io.sockets.sockets[data.socketId];
            if (socketToKill) {
                logger.info(`socket ${data.socketId} terminated.`);
                socketToKill.disconnect();
            }
        });
    });
    return io;
};

module.exports.socketConnect = socketConnect;