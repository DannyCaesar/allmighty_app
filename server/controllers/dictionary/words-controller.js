const express = require('express');
const router = express.Router();
const config = require('../../server.config.js');
const objectId = require('mongodb').ObjectID;
const mongoClient = require('mongodb').MongoClient;

// Fetch all words
router.get('/', (req, res) => {
	mongoClient.connect(config.mongo_port, (err, client) => {
			client.db(config.mongo_dictionary_db).collection("words").find({}).toArray((err,words) => {
				res.send(words);
				client.close();
		})
	})
})

router.post('/', (req, res) => {

	/*if (req.body.groups !== undefined || req.body.groups !== '') req.body.groups = new objectId(req.body.groups);
	else req.body.groups = [];
	let word_id = '';*/

	mongoClient.connect(config.mongo_port, (err, client) => {

		const p = new Promise((resolve, reject) => {
			client.db(config.mongo_dictionary_db).collection("words").insert(req.body, (error, info) => {
				word_id = new objectId(info.insertedIds['0']);
				resolve(word_id);
				if (error) reject(error);
			});
		})
		
		p.then((word_id) => {
			if (req.body.groups !== undefined) {
				client.db(config.mongo_dictionary_db).collection("groups").update({_id: req.body.groups}, { $push: {words: word_id} }, (error, info) =>{
					if (error) throw(error);
				})
			}

			const data = {
				word_id: word_id,
				group_id: req.body.groups
			}

			res.send(data);
		})
		.then(() => client.close())
		.catch((error) => {
			console.log(error);
			client.close();
		});
	})
})

router.patch('/', (req, res) => {
	mongoClient.connect(config.mongo_port, (err, client) => {
		client.db(config.mongo_dictionary_db).collection("words").removeOne({"english": req.body.english, "german": req.body.german, "russian": req.body.russian });
		client.close();
	})

})

router.get('/:id', (req, res) => {
	const id = new objectId(req.params.id);
	mongoClient.connect(config.mongo_port, (error, client) => {
		client.db(config.mongo_dictionary_db).collection('words').findOne({_id: id}, (error,word) => {
			if (error) return res.status(400).send();
			res.send(word);
			client.close();
		})
	})
})

router.delete('/:id', (req, res) => {
	mongoClient.connect(config.mongo_port, (err, client) => {
		client.db(config.mongo_dictionary_db).collection("words").removeOne({"_id": objectId(req.params.id)});
		client.db(config.mongo_dictionary_db).collection("groups").update({},{ $pull: { words: new objectId(req.params.id)} }, (err, documents) => {
			res.send('deleted');
		});
		client.close();
	})
})

router.post('/edit/:id', (req, res) => {
	
	const changeField = req.body.change;
	const changeObject = {};
	changeObject[changeField] = req.body.value;

	mongoClient.connect(config.mongo_port, (err, client) => {
		client.db(config.mongo_dictionary_db).collection("words").update({"_id": objectId(req.params.id)}, { $set: changeObject }, (err, client) => {
			if (err) console.log(err);
		})
	})

	res.send('changed');
})
	
router.post('/loadWords', (req, res) => {
	mongoClient.connect(config.mongo_port, (err, client) => {
			client.db(config.mongo_dictionary_db).collection("words").find({},{ fields: {_id: 0} }).toArray((err,words) => {
				fs.writeFile(req.body.url+'json/words.json',JSON.stringify(words),'utf8',(err)=> {
					if (err) return console.log(err);
					console.log('The file words.json was saved');
				});
			})
			client.db(config.mongo_dictionary_db).collection("groups").find({},{ fields: {_id: 0} }).toArray((err,words) => {
				fs.writeFile(req.body.url+'json/groups.json',JSON.stringify(words),'utf8',(err)=> {
					if (err) return console.log(err);
					console.log('The file groups.json was saved');
				});
			})
				res.send('Файлы сохранены');
				client.close();
		})
})

module.exports = router;