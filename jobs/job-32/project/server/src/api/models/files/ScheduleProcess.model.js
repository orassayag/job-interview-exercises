const { coreUtils } = require('../../utils');

module.exports = class ScheduleProcessModel {

    constructor({ emailBodyId, recipientsList, treatmentScheduleAt, timezoneCode,
        recurrenceDaysInWeek, recurrenceTime }) {
        this.id = coreUtils.generateId();
        this.emailBodyId = emailBodyId; // ObjectId | Required | Model: EmailBody.
        this.recipientsList = recipientsList; // Array | [String] | Required.
        this.timezoneCode = timezoneCode; // Number | Required.
        this.recurrenceDaysInWeek = recurrenceDaysInWeek; // Array | [Number] | Required.
        this.recurrenceTime = recurrenceTime; // Date | Required.
        // Number | Required | Conside atomic operaion on this field.
        this.queuedCount = recipientsList.length;
        this.successCount = 0; // Number | Required | Conside atomic operaion on this field.
        this.failedCount = 0; // Number | Required | Conside atomic operaion on this field.
        this.treatmentScheduleAt = treatmentScheduleAt; // Number | Required
        this.treatmentCompleteAt = null; // Date.
        this.createdAt = new Date(); // Date.
        this.updatedAt = null; // Date.
    }
};