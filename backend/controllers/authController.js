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

const jwt = require('jsonwebtoken'); // stelle sicher, dass das oben importiert ist

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Bitte E-Mail und Passwort angeben." });
  }

  try {
    const user = await knex("users").where({ email }).first();

    if (!user) {
      return res.status(401).json({ error: "E-Mail oder Passwort ist ungültig." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "E-Mail oder Passwort ist ungültig." });
    }

    // ✅ JWT erzeugen
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // ✅ Antwort mit Token
    res.status(200).json({
      message: "Login erfolgreich",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login fehlgeschlagen:", error);
    res.status(500).json({ error: "Login fehlgeschlagen" });
  }
};



module.exports = { register, login };
