const { coreUtils } = require('../../utils');

module.exports = class LanguageModel {

    constructor({ title, isoCode }) {
        this.id = coreUtils.generateId();
        this.title = title; // String | Required | Trim | Min: 3 | Max: 50.
        this.isoCode = isoCode; // String | Required | Trim | Min: 5 | Max: 5.
    }
};