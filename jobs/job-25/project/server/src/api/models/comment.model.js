const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        min: 1,
        max: 20
    },
    comment: {
        type: String,
        required: true,
        trim: true,
        min: 1,
        max: 300
    }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Comment', commentSchema);