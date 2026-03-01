const Holidays = require("../models/holidayModel.js");
const mongoose = require('mongoose');

//get all holidays
const getHolidays = async (req, res) => {
    try {
        const holidays = await Holidays.find({}).sort({ Date: 1 });
        res.status(200).json(holidays);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//post a new holiday
const postHoliday = async (req, res) => {
    const { date, event } = req.body;

    //Empty field check
    let emptyFields = [];
    if (!date || String(date).trim() === '') emptyFields.push('date');
    if (!event || String(event).trim() === '') emptyFields.push('event');
    if(emptyFields.length > 0) return res.status(400).json({error: 'Please fill in all fields', emptyFields});

    //add document to db
    try {
        const holiday = await Holidays.create({ Date: date, Event: event });
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