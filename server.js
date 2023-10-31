// import express, node, and file system
const express = require('express');
const path = require('path');
const fs = require('fs');

// create the port for the server
const PORT = process.env.PORT || 3001;

// initalize express
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// stactic public folder
app.use(express.static('public'));

// Get request for start page
app.get('/', (req, res)=>{
    res.sendFile(path,join(__dirname, '/public/index.html'))
})

// Get request for notes page
app.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// Get request for the notes to display on left side from the api
app.get('/api/notes', (req, res)=>{
    const givenNotes = require('./db/db.json')
    res.json(givenNotes);
})







// listen for connections on specified ports
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);