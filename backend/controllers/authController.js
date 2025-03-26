// backend/src/controllers/authController.js
const db = require('../knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const [user] = await db('users')
      .insert({ name, email, password: hashed })
      .returning(['id', 'name', 'email']);

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: 'Registrierung fehlgeschlagen', detail: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db('users').where({ email }).first();
    if (!user) return res.status(401).json({ error: 'User nicht gefunden' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Falsches Passwort' });

    const token = jwt.sign(
      { id: user.id, is_admin: user.is_admin },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, is_admin: user.is_admin } });
  } catch (err) {
    res.status(500).json({ error: 'Login fehlgeschlagen', detail: err.message });
  }
};

module.exports = { register, login };
