require('dotenv').config();
const LoginDetail = require('../models/authModel.js');
const jwt = require('jsonwebtoken');

const createToken = ( userid, Age, designation ) => {
    const SECRET = process.env.SECRET;
    return (Age != null) ? jwt.sign({ userid, designation }, SECRET, { expiresIn:  (Age * 24 * 60 * 60) }) : jwt.sign({ userid }, SECRET);
}

const authenticateUser = async (req, res) => {
    const { userid, password, Age } = req.body;
    let emptyFields = [];
    if(!userid || userid.trim() === '') emptyFields.push('userid');
    if(!password || password.trim() === '') emptyFields.push('password');
    if (emptyFields.length) 
        return res.status(400).json({ error: 'Missing fields', emptyFields });
    try {
        const user = await LoginDetail.login(userid.toLowerCase(), password);
        const token = createToken(user.userid, Age || null, user.designation);
        res.cookie('loginToken', token, { 
            httpsOnly: true,
            secure: true,
            sameSite: "none",
            Age: Age * 1000}); 
        res.status(200).json({ Message: "login Successful", userid: user.userid });
    } catch (error) {
        if (err.message && (err.message.includes('Incorrect') || err.message.includes('No user')))
            return res.status(401).json({ error: 'Invalid credentials' });
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};


const addUser = async (req, res) => {
    const { userid, password, designation } = req.body;
    try {
        const signup = await LoginDetail.create({ userid: userid.toLowerCase(), password, designation });
        res.status(200).json(signup);
    } catch (error) {
        if(error.code === 11000) 
            res.status(400).json({ error: "Username already registered" });
        else
            res.status(400).json({ error: error.message });
    }
};

const requireAuth = (req, res, next) => {
  const token = req.cookies.loginToken || req.cookies.jwt;
  if (!token) 
    return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { authenticateUser, addUser, requireAuth };