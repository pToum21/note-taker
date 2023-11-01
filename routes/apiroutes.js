const router = require('express').Router();
const fs = require('fs');

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

    fs.writeFile('./db/db.json', JSON.stringify(givenNotes, null, 2), err => {
        if (err) throw Error ('Oh No Something Went Wrong!')
        res.status(201).end();
    })
})



module.exports = router;