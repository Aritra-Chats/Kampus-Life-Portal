const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    sender: {
        type: String,
        required: true
    },
    reciever: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    sendTime: {
        type: String,
        required: true,
        match: [
            /^(\d{2})\/(\d{2})\/(\d{4})\s-\s([01]\d|2[0-3]):([0-5]\d)$/,
            'Please enter a valid date & time in the format DD/MM/YYYY - HH:MM'
        ]
    },
    expiresAt: {
        type: Date,
        required: true,
        expires: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema)