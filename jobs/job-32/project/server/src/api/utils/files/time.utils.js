const textUtils = require('./text.utils');

class TimeUtils {

    getRandomHour() {
        return textUtils.addLeadingZero(textUtils.getRandomNumber(1, 24));
    }
}

module.exports = new TimeUtils();