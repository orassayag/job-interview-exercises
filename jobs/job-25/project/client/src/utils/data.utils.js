import { v4 as uuidv4 } from 'uuid';
import textUtils from './text.utils';
import timeUtils from './time.utils';

class DataUtils {

    constructor() {
        this.sourcesOrder = ['coingecko', 'cryptocompare', 'bitstamp'];
    }

    getId() {
        return uuidv4();
    }

    convertCommentData(data) {
        return data.reduce((acc, item) => {
            acc.push({ ...item, created_at: timeUtils.convertStringToTime(item.created_at) });
            return acc;
        }, []);
    }

    convertCoinData(data) {
        const newCoinData = Object.keys(data).reduce((acc, item, index) => {
            acc[index] = [item, ...data[item].sort((a, b) => {
                return this.sourcesOrder.indexOf(a.key) - this.sourcesOrder.indexOf(b.key);
            }).map(r => textUtils.numberWithCommas(r.rate))];
            return acc;
        }, {});
        return Object.values(newCoinData);
    }
}

export default new DataUtils;