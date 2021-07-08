const { coreUtils } = require('../../utils');

module.exports = class EmailTreatModel {

    constructor({ scheduleProcessId, emailAddress, statusCode }) {
        this.id = coreUtils.generateId();
         // ObjectId | Required | Model: ScheduleProcess. Index = true.
        this.scheduleProcessId = scheduleProcessId;
        this.emailAddress = emailAddress; // String | Required | Trim | Min: 3 | Max: 250.
        this.statusCode = statusCode; // String | Required | Trim | Min: 3 | Max: 20.
        this.treatmentCompleteAt = null; // Date.
        this.createdAt = new Date(); // Date.
        this.updatedAt = null; // Date.
    }
};