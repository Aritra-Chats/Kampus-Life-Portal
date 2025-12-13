require('dotenv').config();
const LoginDetail = require('../models/authModel.js');
const jwt = require('jsonwebtoken');

const createToken = ( userid, Age, designation ) => {
    const SECRET = process.env.SECRET;
    return (Age != null) ? jwt.sign({ userid, designation }, SECRET, {
        expiresIn:  Age
    }) : jwt.sign({ userid }, SECRET);
}

const authenticateUser = async (req, res) => {
    const { userid, password, Age } = req.body;
    try {
        const user = await LoginDetail.login(userid, password);
        const token = createToken(user.userid, Age, user.designation);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const addUser = async (req, res) => {
    const { userid, password, designation } = req.body;
    try {
        const signup = await LoginDetail.create({ userid, password, designation });
        res.status(200).json(signup);
    } catch (error) {
        if(error.code === 11000) 
            res.status(400).json({ error: "Username already registered" });
        else
            res.status(400).json({ error: error.message });
    }
};

module.exports = { authenticateUser, addUser };