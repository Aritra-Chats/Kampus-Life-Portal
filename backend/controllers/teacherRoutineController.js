const TeacherRoutine = require("../models/teacherRoutineModel.js");
const mongoose = require('mongoose');

//get all teacher routine
const getTeacherRoutine = async (req, res) => {
    const teacherRoutine = await TeacherRoutine.find({}).sort({createdAt: 1});
    res.status(200).json(teacherRoutine);
};

//post a new teacher routine
const postTeacherRoutine = async (req, res) => {
    const { roll, day, time, section, batch, classroom } = req.body;

    //Empty field check
    let emptyFields = [];
    if(roll === '' || roll == null || isNaN(Number(roll))) emptyFields.push('roll');
    if(!day || day.trim() === '' || day.trim() === 'day') emptyFields.push('day');
    if(!time || time.trim() === '') emptyFields.push('time');
    if(!section || section.trim() === '') emptyFields.push('section');
    if(batch === '' || batch == null || isNaN(Number(batch))) emptyFields.push('batch');
    if(!classroom || classroom.trim() === '') emptyFields.push('classroom');
    if(emptyFields.length > 0) return res.status(400).json({error: 'Please fill in all fields', emptyFields});

    //add document to db
    try {
        const teacherRoutine = await TeacherRoutine.create({ roll, day, time, section, batch, classroom });
        res.status(200).json(teacherRoutine);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

//Delete a specific teacher routine
const deleteSpecificTeacherRoutine = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(400).json({error: "Incorrect id"});
    const teacherRoutine = await TeacherRoutine.findOneAndDelete({_id: id});
    if(!teacherRoutine)
        return res.status(400).json({error: "No such teacher routine"});
    res.status(200).json(teacherRoutine);
};

module.exports = {getTeacherRoutine, postTeacherRoutine, deleteSpecificTeacherRoutine};