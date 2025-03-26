const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const db = require('./knex');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Testroute
app.get('/', (req, res) => {
  res.send('API läuft 🎉');
});

// Auth-Routen
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
