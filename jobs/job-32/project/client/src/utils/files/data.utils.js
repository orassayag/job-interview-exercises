import timeUtils from './time.utils';

class DataUtils {

    setScheduleProcess(scheduleProcess) {
        let { treatmentScheduleAt, count, emailBodyId, timezoneCode,
            recurrenceDaysInWeek, recurrenceTime, successCount, failedCount,
            queuedCount } = scheduleProcess;
        recurrenceDaysInWeek = recurrenceDaysInWeek.map(n => timeUtils.getDayByNumber(n)).join(', ');
        recurrenceTime = timeUtils.getTime(recurrenceTime);
        return [treatmentScheduleAt, count, emailBodyId, timezoneCode,
            recurrenceDaysInWeek, recurrenceTime, successCount, failedCount,
            queuedCount];
    }
}

export default new DataUtils;