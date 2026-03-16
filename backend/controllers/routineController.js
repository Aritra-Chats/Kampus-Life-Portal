const Routine = require("../models/routineModel.js");
const mongoose = require('mongoose');

//get all student routine
const getRoutine = async (req, res) => {
    const routine = await Routine.find({}).sort({createdAt: 1});
    res.status(200).json(routine);
};

//post a new student routine
const postRoutine = async (req, res) => {
    const { section, batch, subject, day, time, teacher, classroom } = req.body;

    //Empty field check
    let emptyFields = [];
    if(!section || section === '') emptyFields.push('section');
    if(!batch || batch.trim() === '') emptyFields.push('batch');
    if(!subject || subject.trim() === '') emptyFields.push('subject');
    if(!day || day.trim() === '' || day.trim() === 'day') emptyFields.push('day');
    if(!time || time.trim() === '') emptyFields.push('time');
    if(!teacher || teacher.trim() === '') emptyFields.push('teacher');
    if(!classroom || classroom.trim() === '') emptyFields.push('classroom');
    if(emptyFields.length > 0) return res.status(400).json({error: 'Please fill in all fields', emptyFields});

    //add document to db
    try {
        const routine = await Routine.create({ section, batch, subject, day, time, teacher, classroom });
        res.status(200).json(routine);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

//Delete a specific student routine
const deleteSpecificRoutine = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(400).json({error: "Incorrect id"});
    const routine = await Routine.findOneAndDelete({_id: id});
    if(!routine)
        return res.status(400).json({error: "No such student routine"});
    res.status(200).json(routine);
};

module.exports = {getRoutine, postRoutine, deleteSpecificRoutine};