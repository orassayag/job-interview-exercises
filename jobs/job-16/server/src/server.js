const http = require('http');
const settings = require('./settings/settings');
const App = require('./app');

class Server {

    constructor() {
        this.httpServer = null;
        this.isProcessExit = false;
        this.setProcess();
        this.appContainer = new App();
        this.app = this.appContainer.app;
        this.appContainer.initiate();
        this.initiate();
    }

    initiate() {
        const { NODE_ENV, SERVER_PORT } = settings;
        this.httpServer = http.createServer(this.app);
        this.httpServer.listen(SERVER_PORT);
        this.httpServer.on('listening', () => {
            this.log(`The server is now listening to port ${SERVER_PORT}. The server is now running on ${NODE_ENV} environment.`);
        });
    }

    setProcess() {
        process.on('uncaughtException', (error) => {
            console.log(error);
        });
        process.on('unhandledRejection', (reason, promise) => {
            console.log(reason);
            console.log(promise);
        });
    }

    log(text) {
        console.log(`===${text}===`);
    }
}

new Server();