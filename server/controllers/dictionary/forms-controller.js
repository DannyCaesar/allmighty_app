const express = require('express');
const router = express.Router();
const config = require('../../server.config.js');
const objectId = require('mongodb').ObjectID;
const mongoClient = require('mongodb').MongoClient;

router.put('/:id', (req, res) => {
	const id = req.params.id; //Not an objectId, but Date.now()
	const word_id = new objectId(req.body.word_id);
	mongoClient.connect(config.mongo_port, (err, client) => {
		client.db(config.mongo_dictionary_db).collection("words").update({_id: word_id},{$pull: {forms: {id: id} } }, (error) => {
			if (error) res.send({ error: error.message });
			else res.send({ success: "Форма удалена"});
		})
	})
})


module.exports = router;