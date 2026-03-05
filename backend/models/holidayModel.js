const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const datePattern = /^(?:0[1-9]|[12]\d|3[01])-(?:0[1-9]|1[0-2])-\d{4}(?:--(?:0[1-9]|[12]\d|3[01])-(?:0[1-9]|1[0-2])-\d{4})?$/;

function isValidCalendarDate(dateString) {
    const [dayText, monthText, yearText] = dateString.split('-');
    const day = Number(dayText);
    const month = Number(monthText);
    const year = Number(yearText);

    const parsedDate = new Date(year, month - 1, day);

    return (
        parsedDate.getFullYear() === year &&
        parsedDate.getMonth() === month - 1 &&
        parsedDate.getDate() === day
    );
}

function toTimeValue(dateString) {
    const [dayText, monthText, yearText] = dateString.split('-');
    const day = Number(dayText);
    const month = Number(monthText);
    const year = Number(yearText);
    return new Date(year, month - 1, day).getTime();
}

function isValidHolidayDate(value) {
    if (!datePattern.test(value)) {
        return false;
    }

    const dateParts = value.split('--');
    if (!dateParts.every(isValidCalendarDate)) {
        return false;
    }

    if (dateParts.length === 2) {
        const [startDate, endDate] = dateParts;
        return toTimeValue(endDate) >= toTimeValue(startDate);
    }

    return true;
}

const holidaySchema = new Schema ({
    Date: {
        type: String,
        required: true,
        trim: true,
        validate: [
            {
                validator: function(value) {
                    return isValidHolidayDate(value);
                },
                message: 'Please enter a valid date in DD-MM-YYYY or DD-MM-YYYY--DD-MM-YYYY format (range end must be on or after start)'
            }
        ]
    },
    Event: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Holiday', holidaySchema);