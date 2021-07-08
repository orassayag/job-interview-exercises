class TimeUtils {

    addLeadingZero(number) {
        return number < 10 ? `0${number}` : number;
    }

    convertToTime(date) {
        if (!date) { return null; }
        date = new Date(date);
        const hours = this.addLeadingZero(date.getHours());
        const minutes = `0${date.getMinutes()}`;
        const seconds = `0${date.getSeconds()}`;
        return `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
    }

    convertStringToTime(stringValue) {
        const isDate = (new Date(stringValue) !== 'Invalid Date') && !isNaN(new Date(stringValue));
        return isDate ? this.convertToTime(stringValue) : stringValue;
    }
}

export default new TimeUtils();