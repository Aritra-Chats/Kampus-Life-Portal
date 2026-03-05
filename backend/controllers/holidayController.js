const Holidays = require("../models/holidayModel.js");
const mongoose = require('mongoose');

const parseDDMMYYYYToTimestamp = (dateText) => {
    const [dayText, monthText, yearText] = dateText.split('-');
    const day = Number(dayText);
    const month = Number(monthText);
    const year = Number(yearText);
    return new Date(year, month - 1, day).getTime();
};

const getRangeStartDate = (dateValue) => String(dateValue).split('--')[0];

//get all holidays
const getHolidays = async (req, res) => {
    try {
        const holidays = await Holidays.find({});
        holidays.sort((left, right) => {
            const leftTime = parseDDMMYYYYToTimestamp(getRangeStartDate(left.Date));
            const rightTime = parseDDMMYYYYToTimestamp(getRangeStartDate(right.Date));
            return leftTime - rightTime;
        });
        res.status(200).json(holidays);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//post a new holiday
const postHoliday = async (req, res) => {
    const { date, event } = req.body;
    const normalizedDate = typeof date === 'string' ? date.trim() : date;
    const normalizedEvent = typeof event === 'string' ? event.trim() : event;

    //Empty field check
    let emptyFields = [];
    if (!normalizedDate || String(normalizedDate).trim() === '') emptyFields.push('date');
    if (!normalizedEvent || String(normalizedEvent).trim() === '') emptyFields.push('event');
    if(emptyFields.length > 0) return res.status(400).json({error: 'Please fill in all fields', emptyFields});

    //add document to db
    try {
        const holiday = await Holidays.create({ Date: normalizedDate, Event: normalizedEvent });
        res.status(200).json(holiday);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

//Delete a specific holiday
const deleteSpecificHoliday = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(400).json({error: "Incorrect id"});
    const holiday = await Holidays.findOneAndDelete({_id: id});
    if(!holiday)
        return res.status(400).json({error: "No such holiday"});
    res.status(200).json(holiday);
};

module.exports = {getHolidays, postHoliday, deleteSpecificHoliday};