const { v4: uuidv4 } = require('uuid');
const { listLanguageCodes, getLanguageName } = require('language-cultures');
const moment = require('moment-timezone');
const faker = require('faker');

class CoreUtils {

    generateId() {
        return uuidv4();
    }

    generateRecipient() {
        const name = faker.name.findName();
        const phone = faker.phone.phoneNumber();
        const email = faker.internet.email(...name.split(' '));
        return { name, phone, email };
    }

    getLanguagesList() {
        return listLanguageCodes().map((c) => {
            return { title: getLanguageName(c), isoCode: c.toLowerCase() };
        });
    }

    getTimezonesList() {
        return moment.tz.names().map((t, i) => {
            return { name: t, code: i + 1 };
        });
    }

    sleep(milliseconds) {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }
}

module.exports = new CoreUtils();