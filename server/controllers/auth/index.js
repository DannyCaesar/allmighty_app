const express = require('express');
const router = express.Router();
const config = require('../../server.config.js');
const objectId = require('mongodb').ObjectID;
const mongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');


//Registration
router.post('/registration', (req, res) => {
	const data = req.body.data; //name, surname, username, password
	let user_id = '';
	mongoClient.connect(config.mongo_port, (error, client) => {
		if (error) { 
			console.log("Connection error on /api/registration");
			res.status(400).send();
		}
		client.db(config.mongo_dictionary_db).collection('users').insert(data, (error, users) => {
			user_id = new objectId(users.insertedIds['0']);
			if (error) console.log(error);
		})
	})
})

//Login
router.post('/login', (req, res) => {

	const login = req.body.login;
	const password = req.body.password;

	mongoClient.connect(config.mongo_port, (error, client) => {
		if (error) { 
			console.log("Connection error on /api/login");
			res.status(400).send();
		}

		client.db(config.mongo_dictionary_db).collection('users').findOne({username: login, password: password}, (error, user) => {
			if (!user) res.send({ message: "No user with such login and password" });
			if (error) console.log(error);
			if (user) {
				const token = jwt.sign({
					data: 'foobar'
				}, 'secret', { expiresIn: '1h' });

				res.cookie('jwt', token, {
					maxAge: config.jwt_expiration_time,
					httpOnly: false
				}).send({ message: "OK" });
			}
		})

	})
})

module.exports = router;