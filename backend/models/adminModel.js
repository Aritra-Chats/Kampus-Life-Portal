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
            /^([01]\d|2[0-3]):([0-5]\d)$/,
            'Please enter a valid time in the format HH:MM'
        ]
    },
    expiresAt: {
        type: Date,
        required: true,
        expires: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema)