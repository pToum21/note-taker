const router = require('express').Router();
const fs = require('fs');
const { readAndRemove, readFromFile, readAndAppend } = require('../helpers/fsUtils')

// function that generates a random number for the notes id 
function randomID() {
    return (Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1));
}

// all routes prepeneded with '/api'

router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then(data => res.json(JSON.parse(data)))
})


// this will write notes to the db.json file which will also add it to the page
router.post('/notes', (req, res) => {
    const newNote = {title: req.body.title, text: req.body.text, id:randomID()}
    readAndAppend(newNote, "./db/db.json")
    res.json(newNote)
})

// this will delete notes based on what note was clicked using it ids
router.delete('/notes/:id', (req, res) => {
    readAndRemove(req.params.id, './db/db.json')
    res.json('Deleted')
})




module.exports = router;