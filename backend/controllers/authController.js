// backend/src/controllers/authController.js
const db = require('../knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Felder prüfen
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Bitte alle Felder ausfüllen." });
  }

  // Passwort-Stärke prüfen
  const isStrong =
    password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password);

  if (!isStrong) {
    return res.status(400).json({
      error:
        "Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Buchstaben und eine Zahl enthalten.",
    });
  }

  try {
    // Existierende E-Mail prüfen
    const existingUser = await knex("users").where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ error: "Diese E-Mail ist bereits registriert." });
    }

    // Passwort hashen
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await knex("users")
      .insert({ name, email, password: hashedPassword })
      .returning(["id", "name", "email"]);

    res.status(201).json({ user: newUser[0] });
  } catch (error) {
    console.error("Registrierung fehlgeschlagen:", error);
    res.status(500).json({ error: "Registrierung fehlgeschlagen" });
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
