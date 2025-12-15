const router = require('express').Router();
const { authenticateUser, addUser, requireAuth } = require('../controllers/authController.js');

router.post('/login', authenticateUser);
router.post('/signup', addUser);
router.get('/check', requireAuth, (req, res) => {
  res.status(200).json({ authenticated: true });
});

module.exports = router;