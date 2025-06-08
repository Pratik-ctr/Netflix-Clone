const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());  

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'NewPassword',
  database: 'netflix_clone'
});

db.connect(err => {
  if (err) {
    console.error('DB connection failed:', err);
    process.exit(1); 
  }
  console.log('Connected to MySQL');
});

// Sign Up
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  // Step 1: Check if email exists
  const checkEmailSql = 'SELECT * FROM users WHERE email = ?';
  db.query(checkEmailSql, [email], (err, results) => {
    if (err) return res.status(500).send({ error: err });

    if (results.length > 0) {
      return res.status(400).send({ message: 'Email is already registered' });
    }

    // Step 2: Insert new user
    const insertSql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(insertSql, [username, email, password], (err, result) => {
      if (err) return res.status(500).send({ error: err });
      res.send({ message: 'User registered successfully' });
    });
  });
});


// Sign In
app.post('/signin', (req, res) => {
  console.log('Signin request body:', req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Signin DB error:', err);
      return res.status(500).json({ message: 'Database error during signin' });
    }
    if (results.length > 0) {
      const user = { id: results[0].id, username: results[0].username, email: results[0].email };
      res.json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
