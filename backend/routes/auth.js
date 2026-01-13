const router = require('express').Router();
const { authenticateUser, addUser, requireAuth, logoutUser, getUserInfo } = require('../controllers/authController.js');

router.post('/login', authenticateUser);
router.post('/logout', logoutUser);
router.post('/signup', addUser);
router.get('/check', requireAuth, (req, res) => {
  res.status(200).json({ authenticated: true });
});
router.get('/user-info', requireAuth, getUserInfo);

module.exports = router;