class TimeUtils {

    constructor() { }

    getDayTimes() {
        return [...Array(49)].map((e, i) => {
            const isHalf = i / 2 % 1 != 0;
            const key = i / 2 - i / 2 % 1;
            return { value: key + (isHalf ? 0.5 : 0), display: (i / 2 < 10 ? '0' : '') + (key) + (isHalf ? ':30' : ':00') };
        });
    }

    addLeading(number) {
        if (number.toString().length === 2) {
            return number;
        }
        return number < 10 ? ('0' + number) : number;
    }

    convertToTime(hour, minute) {
        return `${this.addLeading(hour)}:${this.addLeading(minute)}`;
    }

    getDateFromTimes(hour, minute) {
        const date = new Date();
        date.setHours(hour);
        date.setMinutes(minute);
        return date;
    }

    getDisplayDate() {
        const date = new Date();
        return `${date.toLocaleString('default', { month: 'long' })} ${date.getDay()}, ${date.getFullYear()}`;
    }
}

export default new TimeUtils();