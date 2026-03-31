const logger = require('./logger.service');
const database = require('./database.service');
const queue = require('./queue.service');
const { coreUtils, textUtils } = require('../utils');

class Sender {

    constructor() {
        // The socket.io instance.
        this.io = null;
    }

    initiate(io) {
        this.io = io;
    }

    // Simulate the sending email process and return random boolean for success or not.
    async sendEmail(fullName, emailAddress, emailBodyId) {
        /*
            ToDo: Fetch the email body from the database and replace the relevant parameters to
                  send the email.
        */
        await coreUtils.sleep(10);
        // ToDo: Change for 1000 to simulate slow sending email process.
        return textUtils.getRandomBoolean();
    }

    async treatScheduleProcesses(scheduleProcesses) {
        await Promise.all(scheduleProcesses.map(async (s) => {
            const { recipientsList, emailBodyId } = s;
            await Promise.all(recipientsList.map((r) => {
                return queue.enqueue({
                    scheduleProcessId: s.id,
                    emailBodyId,
                    fullName: r.fullName,
                    emailAddress: r.email
                });
            }));
        }));
    }

    /*
       ToDo: This can be treated in more elegant way. The client need all the scheduleProcess
             modal only for the first time, in the rest of the time need to pass to the client
             only the scheduleProcessId and the counts.

       ToDo: In the real world application, we will NOT call the database to get the fresh
             schedule process data, yet conside using atomic operations to update the counts
             for schedule process.
             Another point need to be considered - How to get the last treat of a scheduled
             process. Here we do it by get the fresh schedule process data. What can we do
             in the real world?
    */

    async treatEmail({ scheduleProcessId, emailBodyId, fullName, emailAddress }) {
        // Simulate the sending email process.
        const isSuccess = await this.sendEmail(fullName, emailAddress, emailBodyId);
        // Write to the log.
        logger.log('silly', `Process: ${scheduleProcessId} | To: ${emailAddress} => ${isSuccess}`);
        // Update the schedule process instance on the database.
        const scheduleProcess = database.updateScheduleProcess(
            scheduleProcessId, emailAddress, isSuccess
        );
        // Emit the updated values of the schedule process to the client.
        this.io.emit('bulk', scheduleProcess);
        // Clear the task from the queue. In a real world application it will be done automatically
        // (a more advanced queue).
        queue.dequeue();
    }
}

module.exports = new Sender();