// backend/src/routes/auth.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: `Willkommen, ${req.user.name}` });
  });

module.exports = router;
