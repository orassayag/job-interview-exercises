const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    source: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    coin: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    rate: {
        type: Number,
        required: true
    },
    isError: {
        type: Boolean,
        required: true
    },
    created_at: { // Temporary workaround.
        type: Date,
        require: true
    }
}, { timestamps: { createdAt: 'created_at' } }); // ToDo: For some reason - created_at not working with insertMany action - Need to Ask in StackOverFlow.

module.exports = mongoose.model('Record', recordSchema);