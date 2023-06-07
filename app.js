const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const cors = require('cors');

// Enable CORS
app.use(cors());

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'car_hire_db'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database');
    throw err;
  }
  console.log('Connected to the database');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GET all cars
app.get('/cars', (req, res) => {
  const query = 'SELECT * FROM car';

  connection.query(query, (err, carRows) => {
    if (err) {
      console.error('Error retrieving cars:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    const categoryQuery = 'SELECT * FROM category';

    connection.query(categoryQuery, (err, categoryRows) => {
      if (err) {
        console.error('Error retrieving categories:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      const data = {
        cars: carRows,
        categories: categoryRows
      };

      res.json(data);
    });
  });
});

// GET categories
app.get('/categories', (req, res) => {
  const query = 'SELECT * FROM category';

  connection.query(query, (err, rows) => {
    if (err) {
      console.error('Error retrieving categories:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(rows);
  });
});

// GET cars by category ID
app.get('/cars/:categoryid', (req, res) => {
  const { categoryid } = req.params;
  const query = 'SELECT * FROM car WHERE category_id = ?';
  const values = [categoryid];

  connection.query(query, values, (err, rows) => {
    if (err) {
      console.error('Error retrieving cars by category ID:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(rows);
  });
});

// POST a new car
app.post('/cars', (req, res) => {
  const { make, model, price, colour, category_id } = req.body;
  const query = 'INSERT INTO car (make, model, price, colour, category_id) VALUES (?, ?, ?, ?, ?)';
  const values = [make, model, price, colour, category_id];

  connection.query(query, values, (err) => {
    if (err) {
      console.error('Error inserting a new car:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json({ message: 'Car inserted successfully' });
  });
});

// PUT update a car by car ID
app.put('/cars/:carid', (req, res) => {
  const { carid } = req.params;
  const { make, model, price, colour, category_id } = req.body;
  const query = 'UPDATE car SET make = ?, model = ?, price = ?, colour = ?, category_id = ? WHERE car_id = ?';
  const values = [make, model, price, colour, category_id, carid];

  connection.query(query, values, (err) => {
    if (err) {
      console.error('Error updating a car:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json({ message: 'Car updated successfully' });
  });
});

// DELETE a car by car ID
app.delete('/cars/:carid', (req, res) => {
  const { carid } = req.params;
  const query = 'DELETE FROM car WHERE car_id = ?';
  const values = [carid];

  connection.query(query, values, (err) => {
    if (err) {
      console.error('Error deleting a car:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json({ message: 'Car deleted successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
