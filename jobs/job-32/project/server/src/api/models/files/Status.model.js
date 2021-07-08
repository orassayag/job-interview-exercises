const { coreUtils } = require('../../utils');

module.exports = class StatusModel {

    constructor({ name, code }) {
        this.id = coreUtils.generateId();
        this.name = name; // String | Required | Min: 5 | Max: 20.
        this.code = code; // Number | Required.
    }
};