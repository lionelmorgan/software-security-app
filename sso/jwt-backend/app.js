// app.js server-side
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const { secretKey } = require('./setup.js');

const app = express();
const PORT = 5000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Lmmpa@910019',
  port: 5432,
});

app.use(bodyParser.json());
app.use(cors());

app.post('/api/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const result = await pool.query(
      'INSERT INTO users_table (username, password, email) VALUES ($1, $2, $3) RETURNING id',
      [username, hashedPassword, email]
    );
    const userId = result.rows[0].id;
    const token = jwt.sign({ id: userId }, secretKey, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
