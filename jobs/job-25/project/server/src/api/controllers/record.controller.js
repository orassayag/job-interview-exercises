/* eslint-disable max-len */
const httpStatus = require('http-status');
const { request } = require('../services/api.service');
const logger = require('../services/logger.service');
const RecordModel = require('../models/record.model');
const { organizeData } = require('../utils/record.utils');
const { sources } = require('../../config/vars.config');

const coinsList = ['btc', 'eth', 'ltc'];
const sourcesKeys = Object.keys(sources);

// Fetch the data from the APIs.
const getCoinsData = async () => {
    const coinsData = await Promise.all(sourcesKeys.flatMap((s) => coinsList.map((c) => request(`${sources[s].uri}${sources[s][c]}`, s, c))));
    if (coinsData && coinsData.length > 0) {
        const date = new Date();
        return coinsData.map((d) => {
            const data = {
                source: d.sourceName,
                coin: d.coinName,
                rate: null,
                isError: d.isError,
                created_at: date
            };
            if (!data.isError) {
                switch (d.sourceName) {
                    case 'bitstamp': { data.rate = parseFloat(d.data.high); break; }
                    case 'cryptocompare': { data.rate = parseFloat(d.data.USD); break; }
                    case 'coingecko': { data.rate = parseFloat(d.data[0].current_price); break; }
                }
            }
            return data;
        });
    }
    return null;
};

// Save the fetched data into the database.
const saveCoinsData = (coinsData) => {
    RecordModel.collection.insertMany(coinsData, (err) => {
        if (err) { logger.error(err); }
    });
};

// Publish the data to the socket.
const publishCoinsData = (io, coinsData) => {
    io.emit('coins', coinsData);
};

// Create a records round.
exports.createRecordRound = async (io) => {
    try {
        // Fetch all coins from external sources.
        const coinsData = await getCoinsData();
        if (!coinsData) { return; }
        // Save the data in the database.
        saveCoinsData(coinsData);
        // Publish the data by the socket.
        publishCoinsData(io, coinsData);
    } catch (error) {
        logger.error(error.stack || error);
    }
};

// Get latest top records of a specific coin.
exports.getHistory = async (req, res) => {
    try {
        const data = await RecordModel.find({ coin: { $eq: req.query.coin } })
            .limit(parseInt(req.query.top, 10))
            .sort('-created_at');
        res.status(httpStatus.OK);
        res.json(organizeData(data));
    } catch (error) {
        logger.error(error.stack || error);
        res.status(httpStatus.BAD_REQUEST);
    }
    return res;
};