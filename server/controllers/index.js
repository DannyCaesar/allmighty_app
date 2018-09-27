const express = require('express');
const router = express.Router();
const path = require('path');


router.use('/auth', require('./auth/index'));

//Dictionary routes
router.use('/api/words', require('./dictionary/words-controller'));
router.use('/api/groups', require('./dictionary/groups-controller'));
router.use('/api/forms', require('./dictionary/forms-controller'));


router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../build/index.html'), (err) => {
		if (err) console.log(err);
	})
})

router.get('/home', (req, res) => {
	res.sendFile(path.join(__dirname, '../build/index.html'), (err) => {
		if (err) console.log(err);
	})
})

router.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, '../build/index.html'), (err) => {
		if (err) console.log(err);
	})
});

module.exports = router;