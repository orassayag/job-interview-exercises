const { coreUtils } = require('../../utils');

module.exports = class TimeZoneModel {

    constructor({ name, code }) {
        this.id = coreUtils.generateId();
        this.name = name; // String | Required | Min: 5 | Max: 250.
        this.code = code; // Number | Required.
    }
};