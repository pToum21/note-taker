// import express, node, and file system
const express = require('express');
const routes = require('./routes/indexroutes')

// create the port for the server
const PORT = process.env.PORT || 3001;

// initalize express
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// stactic public folder
app.use(express.static('public'));
app.use(routes)


// listen for connections on specified ports
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);