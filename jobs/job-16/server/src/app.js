const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const headersMiddleware = require('./middlewares/headers.middleware');
const candidatesRoute = require('./routes/candidates.route');

class App {

    constructor() {
        this.app = express();
    }

    initiate() {
        try {
            this.initiateConfigurations();
            this.initiateSecurity();
            this.initiateRoutes();
            this.log('The App application initiates complete.');
        } catch (error) {
        }
    }

    initiateConfigurations() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.json());
    }

    initiateSecurity() {
        this.app.disable('x-powered-by');
        this.app.use(cors({ credentials: true, origin: true }));
        this.app.options('*', cors());
    }

    initiateRoutes() {
        this.app.use(errorHandler());
        this.app.use('*', headersMiddleware);
        // Routes.
        this.app.use('/api/candidates', candidatesRoute.router);
    }

    log(text) {
        console.log(`===${text}===`);
    }
}

module.exports = App;