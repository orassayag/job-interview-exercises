const { EmailBodyModel, EmailTreatModel, LanguageModel, RecipientModel,
    ScheduleProcessModel, StatusModel, TimezoneModel } = require('../models');
const { maxConcurrency } = require('../../config/vars.config');
const logger = require('./logger.service');
const { coreUtils, timeUtils, textUtils } = require('../utils');

/*
    In the real world, you will probably do a lot of validations when creating
    each modal (especially of the recipient's inputs like name, email, phone, etc).
    To keep things simple, we will skip any validation here.
*/

class Database {

    constructor() {

        this.database = {
            emailBodies: [],
            emailTreats: [],
            languages: [],
            recipients: [],
            scheduleProcesses: [],
            statuses: [],
            timezones: []
        };
    }

    createLanguages() {
        this.database.languages = coreUtils.getLanguagesList().map((c) => new LanguageModel(c));
    }

    createEmailBodies() {
        for (let i = 0; i < this.database.languages.length; i++) {
            const number = i + 1;
            const { isoCode } = this.database.languages[i];
            this.database.emailBodies.push(new EmailBodyModel({
                title: `A random email template #${number}`,
                body: `
                        Hi #NAME#,
                        This is a random email template #${number}
                        associated with the ${isoCode} language.
                        `,
                isoCode
            }));
        }
    }

    createStatuses() {
        this.database.statuses = [
            new StatusModel({
                name: 'QUEUED',
                code: 1
            }),
            new StatusModel({
                name: 'SUCCESS',
                code: 200
            }),
            new StatusModel({
                name: 'FAILED',
                code: 500
            })
        ];
    }

    createTimezones() {
        this.database.timezones = coreUtils.getTimezonesList().map((t) => new TimezoneModel(t));
    }

    // Initiate all the static data.
    initiate() {
        return new Promise((resolve, reject) => {
            // Create all the languages.
            this.createLanguages();
            // Create akk the statuses.
            this.createStatuses();
            // Create all the timezones.
            this.createTimezones();
            // Create all the email bodies.
            this.createEmailBodies();
            logger.info('Database initialize complete.');
            resolve();
        });
    }

    /*
       An alternative way is to return an array of recipient ids, to reduce the amount
       of data in the database for the recipients list. For the simplicity, we
       will return here array of email addresses.

       Another point, in the real world we will probable don't want to store duplicate
       recipients with the same email address. Again, For the simplicity, we will
       not check for duplicates here.
    */

    // Create the random recipients.
    createRecipients() {
        const recipientsCount = textUtils.getRandomNumber(1, maxConcurrency);
        const recipientsList = [];
        for (let i = 0; i < recipientsCount; i++) {
            const { name, phone, email } = coreUtils.generateRecipient();
            recipientsList.push({ fullName: name, email });
            this.database.recipients.push(new RecipientModel({
                fullName: name,
                emailAddress: email,
                phoneNumber: phone,
                isoCode: textUtils.getRandomItem(this.database.languages).isoCode,
                timezoneCode: textUtils.getRandomItem(this.database.timezones).code,
                /*
                   For simplicity we will not use this field. But it worth declaration,
                   because in the real world, not every recipient is subscribed to the
                   mailing list.
                */
                isSubscribed: textUtils.getRandomBoolean()
            }));
        }
        return recipientsList;
    }

    // Creates a new schedule process.
    createScheduleProcess(timestamp) {
        /*
           In a real world application, we will get associated timezoneCode according
           to the language.
           For simplicity, here we just random isoCode and timezoneCode.
        */
        const randomISOCode = textUtils.getRandomItem(this.database.languages)
            .isoCode.toLowerCase();
        const { id } = this.database.emailBodies.find((eb) => eb.isoCode === randomISOCode);
        const { code } = textUtils.getRandomItem(this.database.timezones);

        const scheduleProcess = new ScheduleProcessModel({
            emailBodyId: id,
            /*
               For now, random recipients list. In the real world - You will probably want
               to fetch them according to theire culture (similar to the email body),
               timezone, isSubscribed=true, and by the product demands.
            */
            recipientsList: this.createRecipients(),
            timezoneCode: code,
            /*
               For now, random recurrence days and specific time. In the real world it's depend
               on the recipients culture, timezone, and product needs.
            */
            recurrenceDaysInWeek: textUtils.getRandomNumbersList(),
            recurrenceTime: timeUtils.getRandomHour(),
            treatmentScheduleAt: timestamp
        });
        this.database.scheduleProcesses.push(scheduleProcess);
        return scheduleProcess;
    }

    /*
       ToDo: Assume that in the real world we have millions of definitions in the same time,
       you will want to keep track on the specific ScheduleProcess (maybe for
       statistics?) by the id.
    */

    // Create a number of schedule processes.
    createScheduleProcesses(timestamp) {
        // ToDo: If it's MongoDB (async call), maybe change it to Promise.All.
        const scheduleProcesses = [];
        const processesCount = textUtils.getRandomNumber(1, 5);
        for (let i = 0; i < processesCount; i++) {
            scheduleProcesses.push(this.createScheduleProcess(timestamp));
        }
        return scheduleProcesses;
    }

    getTimeZone(code) {
        return this.database.timezones.find((t) => t.code === code);
    }

    // Gets a schedule process by a given id.
    getScheduleProcess(scheduleProcessId) {
        return this.database.scheduleProcesses.find((sp) => sp.id === scheduleProcessId);
    }

    updateScheduleProcess(scheduleProcessId, emailAddress, isSuccess) {
        // Create a treat instance in the database (maybe for statistics?).
        this.database.emailTreats.push(new EmailTreatModel({
            scheduleProcessId,
            emailAddress,
            /*
                ToDo: need to think if we wanna fetch the queue code
                      for every creation. Maybe use some caching here.
            */
            statusCode: this.database.statuses[0].code
        }));
        // Update the schedule process. In the real world - Maybe use atomic operations?
        const scheduleProcessIndex = this.database.scheduleProcesses
            .findIndex((sp) => sp.id === scheduleProcessId);
        const scheduleProcess = this.database.scheduleProcesses[scheduleProcessIndex];
        scheduleProcess.queuedCount--;
        if (isSuccess) { scheduleProcess.successCount++; } else { scheduleProcess.failedCount++; }
        this.database.scheduleProcesses[scheduleProcessIndex] = scheduleProcess;
        scheduleProcess.count = scheduleProcess.recipientsList.length;
        /*
           In a real world application, we will probably not do that, it's wast of
           memory and calls to the database for each finished treat, to fetch the
           timezone name by the code (similar to the status code issue).
           2 good options will be:
           1. In the last treat, do a fetch of the name.
           2. In the client, do a REST API call to fetch all the timezones, store
              them in the state, and parse the timezone code in the client.
           For simplicity we will fetch from database here.
        */
        const timezone = this.getTimeZone(scheduleProcess.timezoneCode);
        if (timezone) {
            scheduleProcess.timezoneCode = timezone.name;
        }
        return scheduleProcess;
    }
}

module.exports = new Database();