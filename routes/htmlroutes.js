const router = require('express').Router();
const path = require('path');

// Get request for start page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

// Get request for notes page
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});


router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = router;