class TimeUtils {

    constructor() {
        this.weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    }

    addLeadingZero(number) {
        return number < 10 ? `0${number}` : number;
    }

    convertToTime(timestamp) {
        if (!timestamp) { return null; }
        const date = new Date(timestamp * 1000);
        const hours = this.addLeadingZero(date.getHours());
        const minutes = `0${date.getMinutes()}`;
        const seconds = `0${date.getSeconds()}`;
        return `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)} (${timestamp})`;
    }

    convertStringToTime(timestamp) {
        const isDate = (new Date(timestamp) !== 'Invalid Date') && !isNaN(new Date(timestamp));
        return isDate ? this.convertToTime(timestamp) : timestamp;
    }

    getDayByNumber(number) {
        return this.weekday[number - 1];
    }

    getTime(time) {
        return `${time}:00`;
    }
}

export default new TimeUtils();