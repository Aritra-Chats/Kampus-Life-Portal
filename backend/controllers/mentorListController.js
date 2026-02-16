const MentorList = require('../models/mentorListModel');
const TeacherList = require('../models/teacherListModel');
const StudentList = require('../models/studentListModel');
const mongoose = require('mongoose');

//get all mentor list
const getMentorList = async (req, res) => {
    try {
        const mentorList = await MentorList.find({}).populate('mentor').populate('mentee').sort({createdAt: 1});
        res.status(200).json(mentorList);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const getMentorById = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(400).json({error: "Incorrect mentor id"});
    
    try {
        const mentorList = await MentorList.findById(id).populate('mentor').populate('mentee');
        if(!mentorList)
            return res.status(404).json({error: "No such mentor found"});
        res.status(200).json(mentorList);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const postMentorData = async (req, res) => {
    const { mentorName, menteeRolls } = req.body;
    let emptyFields = [];
    if(!mentorName || mentorName.trim() === '') emptyFields.push('mentorName');
    if(!menteeRolls || menteeRolls.length === 0) emptyFields.push('menteeRolls');
    if(emptyFields.length > 0) return res.status(400).json({error: 'Please fill in all fields', emptyFields});
    try {
        const teacher = await TeacherList.findOne({ name: mentorName });
        if (!teacher) return res.status(404).json({error: "Teacher not found"});
        const students = await StudentList.find({ roll: { $in: menteeRolls } });
        if (students.length !== menteeRolls.length) 
            return res.status(404).json({error: "Some students not found"});
        const studentObjectIds = students.map(student => student._id);
        const mentorList = new MentorList({
            mentor: teacher._id,
            mentee: studentObjectIds
        });
        await mentorList.save();
        const populatedMentorList = await MentorList.findById(mentorList._id).populate('mentor').populate('mentee');
        res.status(201).json(populatedMentorList);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const deleteMentorData = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(400).json({error: "Incorrect mentor id"});
    try {
        const mentorData = await MentorList.findByIdAndDelete(id);
        if(!mentorData)
            return res.status(404).json({error: "No such mentor found"});
        res.status(200).json(mentorData);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {getMentorList, getMentorById, postMentorData, deleteMentorData};