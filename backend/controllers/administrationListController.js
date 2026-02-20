const AdministrationList = require('../models/administrationListModel');
const mongoose = require('mongoose');

//get all administration list
const getAdministrationList = async (req, res) => {
    const administrationList = await AdministrationList.find({}).sort({createdAt: 1});
    res.status(200).json(administrationList);
};

//post a new administration list
const postAdministrationData = async (req, res) => {
    const { name, designation, department, email, phone, cabin } = req.body;

    //Empty field check
    let emptyFields = [];
    if(!name || name.trim() === '') emptyFields.push('name');
    if(!designation || designation.trim() === '') emptyFields.push('designation');
    if(!department || department.trim() === '') emptyFields.push('department');
    if(!email || email.trim() === '') emptyFields.push('email');
    if(phone === '' || phone == null || isNaN(Number(phone))) emptyFields.push('phone');
    if(!cabin || cabin.trim() === '') emptyFields.push('cabin');
    if(emptyFields.length > 0) return res.status(400).json({error: 'Please fill in all fields', emptyFields});

    //add document to db
    try {
        const administrationData = await AdministrationList.create({ name, designation, department, email, phone, cabin });
        res.status(200).json(administrationData);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

//Delete a specific administration data
const deleteAdministrationData = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(400).json({error: "Incorrect id"});
    const administrationData = await AdministrationList.findOneAndDelete({_id: id});
    if(!administrationData)
        return res.status(400).json({error: "No such student data"});
    res.status(200).json(administrationData);
};

module.exports = {getAdministrationList, postAdministrationData, deleteAdministrationData};