const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const holidaySchema = new Schema ({
    Date: {
        type: Date,
        required: true
    },
    Event: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Holiday', holidaySchema);