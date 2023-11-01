const router = require('express').Router();
const fs = require('fs');

// function that generates a random number for the notes id 
function randomID() {
    return (Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1));
}

// all routes prepeneded with '/api'

router.get('/notes', (req, res) => {
    const givenNotes = require('../db/db.json')
    res.json(givenNotes);
})


// this will write notes to the db.json file which will also add it to the page
router.post('/notes', (req, res) => {
    console.info(`${req.method} request recivied to add a note`)
    const givenNotes = require('../db/db.json')
    const newNote = req.body
    givenNotes.push(newNote)
    newNote.id = randomID()
    fs.writeFile('./db/db.json', JSON.stringify(givenNotes, null, 2), err => {
        if (err) throw Error('Oh No Something Went Wrong!')
        res.status(201).end();
    })
})


router.delete('/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        const deleteNotes = JSON.parse(data)
        const updatedNotes = deleteNotes.filter(note => note.id !== req.params.id);

        fs.writeFile('./db/db.json', JSON.stringify(updatedNotes, null, 2), err => {
            if (err) { throw Error('Oh No Something Went Wrong!') } else { console.log('Note Deleted') }
            res.json(updatedNotes)
        })
    })
})


module.exports = router;