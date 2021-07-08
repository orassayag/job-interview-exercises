class TextUtils {

    getRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getRandomItem(list) {
        return list[this.getRandomNumber(0, list.length - 1)];
    }

    getRandomNumbersList() {
        return Array.from(
            new Set(Array.from({ length: this.getRandomNumber(1, 7) },
                () => this.getRandomNumber(1, 7)))
        ).sort();
    }

    addLeadingZero(number) {
        return number < 10 ? `0${number}` : number;
    }

    getRandomBoolean() {
        return Math.random() < 0.5;
    }
}

module.exports = new TextUtils();