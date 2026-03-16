const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routineSchema = new Schema({
    section: {
        type: String,
        required: true,
        trim: true
    },
    batch: {
        type: String,
        required: true,
        trim: true,
        match: [
            /^\d{4}-\d{4}$/,
            'Please enter a valid batch in the format YYYY-YYYY'
        ],
        validate: {
            validator: function(v) {
                const [start, end] = v.split('-');
                return parseInt(start) < parseInt(end);
            },
            message: 'Start year must be before end year'
        }
    },
    subject: {
        type: String,
        required: true,
        trim: true
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
            /^([01]\d|2[0-3]):([0-5]\d)-([01]\d|2[0-3]):([0-5]\d)$/,
            'Please enter a valid time in the format HH:MM-HH:MM'
        ],
        validate: {
            validator: function(v) {
                const [start, end] = v.split('-');
                return start < end;
            },
            message: 'Start time must be before end time'
        }
    },
    teacher: {
        type: String,
        required: true,
        trim: true
    },
    classroom: {
        type: String,
        required: true,
        trim: true
    }
});

routineSchema.index({section: 1, day: 1, time: 1}, { unique: true });

module.exports = mongoose.model('Routine', routineSchema);