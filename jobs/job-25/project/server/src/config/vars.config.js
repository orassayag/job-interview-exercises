const path = require('path');

// Import all the .env variables.
require('dotenv-safe').config({
    path: path.join(__dirname, '../../.env.example')
});

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    intervalMilliseconds: 10000,
    mongo: {
        uri: process.env.MONGO_URI
    },
    sources: {
        bitstamp: {
            uri: 'https://www.bitstamp.net/api/v2/ticker/',
            btc: 'btcusd',
            eth: 'ethusd',
            ltc: 'ltcusd'
        },
        cryptocompare: {
            uri: 'https://min-api.cryptocompare.com/data/price?api_key=0646cc7b8a4d4b54926c74e0b20253b57fd4ee406df79b3d57d5439874960146&tsyms=USD&fsym=',
            btc: 'BTC',
            eth: 'ETH',
            ltc: 'LTC'
        },
        coingecko: {
            uri: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=',
            btc: 'bitcoin',
            eth: 'ethereum',
            ltc: 'litecoin'
        }
    }
};