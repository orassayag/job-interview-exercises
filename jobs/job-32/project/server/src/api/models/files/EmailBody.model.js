const { coreUtils } = require('../../utils');

module.exports = class EmailBodyModel {

    constructor({ title, body, isoCode }) {
        this.id = coreUtils.generateId();
        this.title = title; // String | Required | Trim | Min: 5 | Max: 150.
        this.body = body; // String | Required | Min: 5
        this.isoCode = isoCode; // String | Required | Trim | Min: 5 | Max: 5.
    }
};