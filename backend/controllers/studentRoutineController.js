const StudentRoutine = require("../models/studentRoutineModel.js");
const mongoose = require('mongoose');

//get all student routine
const getStudentRoutine = async (req, res) => {
    const studentRoutine = await StudentRoutine.find({}).sort({createdAt: 1});
    res.status(200).json(studentRoutine);
};

//post a new student routine
const postStudentRoutine = async (req, res) => {
    const { roll, subject, day, time, classroom, teacher } = req.body;

    //Empty field check
    let emptyFields = [];
    if(roll === '' || roll == null || isNaN(Number(roll))) emptyFields.push('roll');
    if(!subject || subject.trim() === '') emptyFields.push('subject');
    if(!day || day.trim() === '' || day.trim() === 'day') emptyFields.push('day');
    if(!time || time.trim() === '') emptyFields.push('time');
    if(!classroom || classroom.trim() === '') emptyFields.push('classroom');
    if(!teacher || teacher.trim() === '') emptyFields.push('teacher');
    if(emptyFields.length > 0) return res.status(400).json({error: 'Please fill in all fields', emptyFields});

    //add document to db
    try {
        const studentRoutine = await StudentRoutine.create({ roll, subject, day, time, classroom, teacher });
        res.status(200).json(studentRoutine);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

//Delete a specific student routine
const deleteSpecificStudentRoutine = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(400).json({error: "Incorrect id"});
    const studentRoutine = await StudentRoutine.findOneAndDelete({_id: id});
    if(!studentRoutine)
        return res.status(400).json({error: "No such student routine"});
    res.status(200).json(studentRoutine);
};

module.exports = {getStudentRoutine, postStudentRoutine, deleteSpecificStudentRoutine};