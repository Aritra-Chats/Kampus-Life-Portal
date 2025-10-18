const StudentList = require('../models/studentListModel');
const mongoose = require('mongoose');

//get all student list
const getStudentList = async (req, res) => {
    const studentList = await StudentList.find({}).sort({createdAt: 1});
    res.status(200).json(studentList);
};

//post a new student list
const postStudentData = async (req, res) => {
    const { name, roll, email, phone, section } = req.body;

    //Empty field check
    let emptyFields = [];
    if(!name || name.trim() === '') emptyFields.push('name');
    if(roll === '' || roll == null || isNaN(Number(roll))) emptyFields.push('roll');
    if(!email || email.trim() === '') emptyFields.push('email');
    if(phone === '' || phone == null || isNaN(Number(phone))) emptyFields.push('phone');
    if(!section || section.trim() === '') emptyFields.push('section');
    if(emptyFields.length > 0) return res.status(400).json({error: 'Please fill in all fields', emptyFields});

    //add document to db
    try {
        const studentData = await StudentList.create({ name, roll, email, phone, section });
        res.status(200).json(studentData);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};
//Delete a specific student data
const deleteStudentData = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(400).json({error: "Incorrect id"});
    const studentData = await StudentList.findOneAndDelete({_id: id});
    if(!studentData)
        return res.status(400).json({error: "No such student data"});
    res.status(200).json(studentData);
};

module.exports = {getStudentList, postStudentData, deleteStudentData};