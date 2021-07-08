const path = require('path');

// Import all the .env variables.
require('dotenv-safe').config({
    path: path.join(__dirname, '../../.env.example')
});

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    maxConcurrency: 100,
    mongo: {
        uri: process.env.MONGO_URI
    }
};