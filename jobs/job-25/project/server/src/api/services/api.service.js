const axios = require('axios');
const logger = require('./logger.service');

module.exports = {
    async request(uri, sourceName, coinName) {
        let response = null;
        try {
            response = await axios.get(uri);
        } catch (error) {
            logger.error(error.stack || error);
        }
        const data = response?.data;
        return { sourceName, coinName, data, isError: data === null };
    }
};