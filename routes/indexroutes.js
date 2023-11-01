const router = require('express').Router();
const htmlRoutes = require('./htmlroutes');
const apiRoutes = require('./apiroutes');

router.use('/api', apiRoutes);
router.use('/', htmlRoutes)

module.exports = router