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
    age: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Admin', adminSchema)