const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherListSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    roll: {
        type: Number,
        required: true,
        unique: true
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

module.exports = mongoose.model('TeacherList', teacherListSchema);