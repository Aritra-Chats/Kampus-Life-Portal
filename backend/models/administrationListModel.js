const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const administrationListSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    designation: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^[a-zA-Z]+\.[a-zA-Z]+@kiit\.ac\.in$/,
            'Please enter a valid email address'
        ]
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [
            /^\d{10}$/,
            'Please enter a valid 10-digit phone number'
        ]
    },
    cabin: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('AdministrationList', administrationListSchema);