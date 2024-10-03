const cors = require('cors');
const express = require('express');
const app = express();

app.use(express.json());
app.use(cors());  // Enable CORS for all routes

// Your existing routes and server code here

const mysql = require('mysql2');
app.use(express.json()); // To parse JSON bodies

// Database connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'ziruiliu',  // Your MariaDB username
  password: '',  // Your MariaDB password (leave empty if none)
  database: 'userdb'  // The database we created earlier
});

// Test the database connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Route to insert a user
app.post('/users', (req, res) => {
  const { username, phone, email, password } = req.body;
  const query = 'INSERT INTO users (username, phone, email, password) VALUES (?, ?, ?, ?)';
  db.query(query, [username, phone, email, password], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, username, phone, email });
  });
});

// Route to update user details
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { username, phone, email } = req.body;
  
  const query = 'UPDATE users SET username = ?, phone = ?, email = ? WHERE id = ?';
  db.query(query, [username, phone, email, id], (err, result) => {
    if (err) throw err;
    res.send('User updated successfully');
  });
});

// Route to delete a user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.send('User deleted successfully');
  });
});

// Route to get all users
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});


// Start the server on port 5000
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


