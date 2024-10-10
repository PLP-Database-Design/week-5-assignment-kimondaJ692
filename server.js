//npm init
//npm install express mysql2 bcryptjs express-session
// start creating our environment

//http Module: Node.js has a built-in http module to create servers.
//http.createServer(): This method creates a server that listens for requests and sends responses.
//server.listen(): This function starts the server and listens on the specified port.
//req.url: The URL of the request.
//req.method: The HTTP method used (GET, POST, etc.).
//res.writeHead(): Sets the HTTP status code and headers.
//res.end(): Ends the response process.

// HTTP framework for handling requests
const express = require('express');
//Instance of express framework
const app = express(); 
// DBMS Mysql 
const mysql = require('mysql2');
// Cross Origin Resourse Sharing 
const cors = require('cors');
// Environment variable doc 
const dotenv = require('dotenv'); 

// 
app.use(express.json());
app.use(cors());
dotenv.config(); 


console.log(process.env.DB_HOST)


// connection to the database 
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME 
});

// Check if there is a connection 
db.connect((err) => {
    // If no connection 
    if(err) return console.log("Error connecting to MYSQL", err);

    //If connect works successfully
    console.log("Connected to MYSQL as id: ", db.threadId); 
}) 

// Define routes
app.get('/', (req, res) => {
    res.send('API is running');
});

//retrieves all patients
  // Retrieve data from database 



//Retrieve all providers
app.get('/providers', async (req, res) => {
    try {
        const result = await pool.query('SELECT first_name, last_name, provider_specialty FROM providers');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve providers' });
    }
});

//Filter patients by first name
app.get('/patients/:first_name', async (req, res) => {
    const firstName = req.params.first_name;

    try {
        const result = await pool.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = $1', [firstName]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve patients by first name' });
    }
});

//Retrieve all providers by their specialty
app.get('/providers/specialty/:provider_specialty', async (req, res) => {
    const specialty = req.params.provider_specialty;

    try {
        const result = await pool.query('SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = $1', [specialty]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve providers by specialty' });
    }
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Data is a file found in the Views folder 



// Start the server 
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);

    // Sending a message to the browser 
    console.log('Sending message to browser...');
    app.get('/', (req,res) => {
        res.send('Server Started Successfully!');
    });

});