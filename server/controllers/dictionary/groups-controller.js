const express = require('express');
const router = express.Router();
const config = require('../../server.config.js');
const objectId = require('mongodb').ObjectID;
const mongoClient = require('mongodb').MongoClient;
const JWT = require('../../models/JWT')();
const cookieParser = require('cookie-parser');

// Fetching all groups
router.get('/', (req, res) => {
	const jwtDecoded = JWT.verify(req.cookies.jwt).data;
	mongoClient.connect(config.mongo_port, (err, client) => {
		client.db(config.mongo_dictionary_db).collection("groups").find({ user: new objectId(jwtDecoded._id) }).toArray((err, groups) => {
			
			// Getting groups and words in group
			client.db(config.mongo_dictionary_db).collection("words").find({}).toArray((error, words) => {
				let result = groups;
				let buffer = [];
				result.forEach((group,index) => {
					words.forEach((word) => {

						group.words.forEach(w => {
							if (w.toString() == word._id.toString()) 
								buffer.push(word);
						});

					})
					result[index].words = buffer;
				})
				res.json(result);
			})

			
		})
	})
})


router.post('/', (req, res) => {

	const jwtDecoded = JWT.verify(req.cookies.jwt).data;
	const userId = new objectId(jwtDecoded._id); //add user id to group data

	const timestamp = new Date;
	const data = { name: req.body.name, user: userId, words: [], adddate: timestamp };
	if (data.name === "") res.send({ error: "Задайте название для группы"});
	else {
		mongoClient.connect(config.mongo_port, (err, client) => {
			client.db(config.mongo_dictionary_db).collection("groups").insert(data, (error) => {
				if (error) {
					if (error.code == 11000) res.send({ error: "Группа с заданным именем уже существует! "})
					else res.send({error: error.message});
				}
				else res.send({success: "Группа добавлена"});
			});
			client.close();
			
		})
	}
})

router.get('/:id', (req, res) => {
	mongoClient.connect(config.mongo_port, (err, client) => {
		client.db(config.mongo_dictionary_db).collection("groups").findOne({_id: new objectId(req.params.id)},(error, group) => {
			if (error) return res.status(400).send(error);
			res.send(group);
			client.close();
		})
	})
})

router.post('/:id', (req, res) => {
	const group_id = new objectId(req.params.id);
	const word_id = new objectId(req.body.id);
	mongoClient.connect(config.mongo_port, (err, client) => {
		client.db(config.mongo_dictionary_db).collection("groups").update({_id: group_id},{ $pull: { words: word_id } }, (err, documents) => {
			res.send('deleted');
		});
	})
})

router.delete('/:id', (req, res) => {
	const id = new objectId(req.params.id);
	mongoClient.connect(config.mongo_port, (err, client) => {
		client.db(config.mongo_dictionary_db).collection("groups").remove({_id: id}, (error) => {
			if (error) res.send({ error: error.message });
			else res.send({ success: "Группа удалена"});
		})
	})
})


module.exports = router;