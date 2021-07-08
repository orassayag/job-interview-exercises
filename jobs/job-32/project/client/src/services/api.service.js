import axios from 'axios';
import config from '../config/config';

class ResponseData {

    constructor() {
        this.data = null;
        this.error = null;
    }
}

class ApiService {

    constructor() {
        axios.defaults.baseURL = `${config.baseUri}/api/`;
    }

    async get(action) {
        const responseData = new ResponseData();
        try {
            responseData.data = await axios.get(action);
        } catch (error) {
            responseData.error = error;
        }
        return responseData;
    }
}

export default new ApiService();