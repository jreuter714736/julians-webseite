const express = require('express');
const cors = require('cors');
const db = require('./db/knex');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API läuft 🎉');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
