const mysql = require('mysql');

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

// Create the category table if it doesn't exist
const createCategoryTable = `
  CREATE TABLE IF NOT EXISTS category (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
  )
`;

// Create the car table if it doesn't exist
const createCarTable = `
  CREATE TABLE IF NOT EXISTS car (
    car_id INT PRIMARY KEY AUTO_INCREMENT,
    make VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    colour VARCHAR(255) NOT NULL,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES category(category_id)
  )
`;

// Insert data into the category table if it's empty
const insertCategoryData = `
  INSERT INTO category (name)
  SELECT * FROM (SELECT 'Category 1') AS tmp
  WHERE NOT EXISTS (
    SELECT name FROM category WHERE name = 'Category 1'
  ) LIMIT 1
`;

// Insert data into the car table
const insertCarData = `
  INSERT INTO car (make, model, price, colour, category_id)
  VALUES
 
`;

// Check if the category table exists
connection.query('SHOW TABLES LIKE "category"', (err, result) => {
  if (err) {
    console.error('Error checking if category table exists:', err);
    connection.end();
    return;
  }

  if (result.length === 0) {
    // Create the category table
    connection.query(createCategoryTable, (err) => {
      if (err) {
        console.error('Error creating category table:', err);
        connection.end();
        return;
      }
      console.log('Category table created');
      insertCategoryDataIntoTable();
    });
  } else {
    console.log('Category table already exists');
    insertCategoryDataIntoTable();
  }
});

// Function to insert data into the category table
function insertCategoryDataIntoTable() {
  // Insert data into the category table if it's empty
  connection.query('SELECT COUNT(*) as count FROM category', (err, result) => {
    if (err) {
      console.error('Error checking category table data:', err);
      connection.end();
      return;
    }

    const rowCount = result[0].count;
    if (rowCount === 0) {
      connection.query(insertCategoryData, (err) => {
        if (err) {
          console.error('Error inserting data into category table:', err);
          connection.end();
          return;
        }
        console.log('Data inserted into category table');
        createCarTableIfNotExists();
      });
    } else {
      console.log('Data already exists in the category table');
      createCarTableIfNotExists();
    }
  });
}

// Function to create the car table if it doesn't exist
function createCarTableIfNotExists() {
  // Check if the car table exists
  connection.query('SHOW TABLES LIKE "car"', (err, result) => {
    if (err) {
      console.error('Error checking if car table exists:', err);
      connection.end();
      return;
    }

    if (result.length === 0) {
      // Create the car table
      connection.query(createCarTable, (err) => {
        if (err) {
          console.error('Error creating car table:', err);
          connection.end();
          return;
        }
        console.log('Car table created');
        insertCarDataIntoTable();
      });
    } else {
      console.log('Car table already exists');
      insertCarDataIntoTable();
    }
  });
}

// Function to insert data into the car table
function insertCarDataIntoTable() {
  connection.query(insertCarData, (err) => {
    if (err) {
      console.error('Error inserting data into car table:', err);
      connection.end();
      return;
    }
    console.log('Data inserted into car table');
    connection.end();
  });
}
