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
app.get('/', (req, res) => {
    res.sendFile(path, join(__dirname, '/public/index.html'))
})

// Get request for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// Get request for the notes to display on left side from the api
app.get('/api/notes', (req, res) => {
    const givenNotes = require('./db/db.json')
    res.json(givenNotes);
})


// this will write notes to the db.json file which will also add it to the page
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request recivied to add a note`)
    const givenNotes = require('./db/db.json')
    const newNote = req.body
    givenNotes.push(newNote)

    fs.writeFile('./db/db.json', JSON.stringify(givenNotes, null, 2), err => {
        if (err) throw Error ('Oh No Something Went Wrong!')
        res.status(201).end();
    })
})







// listen for connections on specified ports
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);