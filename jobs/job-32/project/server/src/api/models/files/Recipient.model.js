const { coreUtils } = require('../../utils');

module.exports = class RecipientModel {

    constructor({ fullName, emailAddress, phoneNumber, isoCode, timezoneCode, isSubscribed }) {
        this.id = coreUtils.generateId();
        this.fullName = fullName; // String | Required | Trim | Min: 3 | Max: 150.
        // Index = true - To fetch in hight speed the recipient.
        this.emailAddress = emailAddress; // String | Required | Trim | Min: 3 | Max: 250.
        this.phoneNumber = phoneNumber; // String | Required | Trim | Min: 6 | Max: 50.
        this.isoCode = isoCode; // String | Required | Trim | Min: 5 | Max: 5.
        this.timezoneCode = timezoneCode; // Number | Required.
        this.isSubscribed = isSubscribed; // Boolean | Required.
        this.createdAt = new Date(); // Date.
        this.updatedAt = null; // Date.
    }
};