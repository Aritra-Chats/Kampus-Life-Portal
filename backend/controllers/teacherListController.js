const TeacherList = require('../models/teacherListModel');
const mongoose = require('mongoose');

//get all teacher list
const getTeacherList = async (req, res) => {
    const teacherList = await TeacherList.find({}).sort({createdAt: 1});
    res.status(200).json(teacherList);
};

//post a new teacher list
const postTeacherData = async (req, res) => {
    const { name, roll, email, phone, cabin } = req.body;

    //Empty field check
    let emptyFields = [];
    if(!name || name.trim() === '') emptyFields.push('name');
    if(roll === '' || roll == null || isNaN(Number(roll))) emptyFields.push('roll');
    if(!email || email.trim() === '') emptyFields.push('email');
    if(phone === '' || phone == null || isNaN(Number(phone))) emptyFields.push('phone');
    if(!cabin || cabin.trim() === '') emptyFields.push('cabin');
    if(emptyFields.length > 0) return res.status(400).json({error: 'Please fill in all fields', emptyFields});

    //add document to db
    try {
        const teacherData = await TeacherList.create({ name, roll, email, phone, cabin });
        res.status(200).json(teacherData);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

//Delete a specific teacher data
const deleteTeacherData = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(400).json({error: "Incorrect id"});
    const teacherData = await TeacherList.findOneAndDelete({_id: id});
    if(!teacherData)
        return res.status(400).json({error: "No such teacher data"});
    res.status(200).json(teacherData);
};

module.exports = {getTeacherList, postTeacherData, deleteTeacherData};