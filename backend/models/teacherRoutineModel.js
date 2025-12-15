const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherRoutineSchema = new Schema({
    roll: {
        type: Number,
        required: true,
        unique: true
    },
    day: {
        type: String,
        required: true,
        trim: true,
        match: [
            /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)$/,
            'Please enter a valid day'
        ]
    },
    time: {
        type: String,
        required: true,
        trim: true,
        match: [
            /^\d{2}:\d{2}-\d{2}:\d{2}$/,
            'Please enter a valid time in the format HH:MM-HH:MM'
        ]
    },
    section: {
        type: String,
        required: true,
        trim: true
    },
    batch: {
        type: Number,
        required: true
    },
    classroom: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('TeacherRoutine', teacherRoutineSchema);