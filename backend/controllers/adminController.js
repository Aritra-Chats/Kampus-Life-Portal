const Admin = require("../models/adminModel.js");
const mongoose = require('mongoose');

// get all announcements
const getAnnouncements = async (req, res) => {
    const announcement = await Admin.find({}).sort({createdAt: 1});
    res.status(200).json(announcement);
};

// post a new announcement
const postAnnouncement = async (req, res) => {
    const { reciever, subject, body, age } = req.body;

    //Empty field check
    let emptyFields = [];
    if(!reciever || reciever === '' || reciever.trim() === '') emptyFields.push('reciever');
    if(!subject || subject.trim() === '') emptyFields.push('subject');
    if(!body || body.trim() === '') emptyFields.push('body');
    if(!age || age.trim() === '' || isNaN(age)) emptyFields.push('age');
    if(emptyFields.length > 0) return res.status(400).json({error: 'Please fill in all fields', emptyFields});

    //add document to db
    try {
        const announcement = await Admin.create({ reciever, subject, body, age });
        res.status(200).json(announcement);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

//Delete a specific announcement
const deleteAnnouncement = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(400).json({error: "Incorrect id"});
    const announcement = await Admin.findOneAndDelete({_id: id});
    if(!announcement)
        return res.status(400).json({error: "No such announcement"});
    res.status(200).json(announcement);
};

module.exports = { getAnnouncements, postAnnouncement, deleteAnnouncement };