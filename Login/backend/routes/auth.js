const router = require('express').Router();
const { authenticateUser, addUser } = require('../controllers/authController.js');

router.post('/login', authenticateUser);
router.post('/signup', addUser);

module.exports = router;