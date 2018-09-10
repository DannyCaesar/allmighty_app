const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
const fs = require('fs');
require('dotenv').load();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../build')));


const port = process.env.PORT || 3000;
const mongo_dictionary_db = process.env.MONGO_DICTIONARY_DB || "test_db";
const mongo_port = process.env.MONGO_PORT_DEV || "mongodb://localhost:27017";

const sampleData = {
	id: "0",
	english: "cat",
	german: "die Katze",
	russian: "кошка"
}


app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../build/index.html'), (err) => {
		if (err) console.log(err);
	})
})

app.get('/home', (req, res) => {
	res.sendFile(path.join(__dirname, '../build/index.html'), (err) => {
		if (err) console.log(err);
	})
})

//Registration
app.post('/api/registration', (req, res) => {
	const data = req.body.data; //name, surname, username, password
	let user_id = '';
	mongoClient.connect(mongo_port, (error, client) => {
		if (error) { 
			console.log("Connection error on /api/registration");
			res.status(400).send();
		}
		client.db(mongo_dictionary_db).collection('users').insert(data, (error, users) => {
			user_id = new objectId(users.insertedIds['0']);
			if (error) console.log(error);
		})
	})
})

//Login
app.post('/api/login', (req, res) => {
	//const login = req.body.login;
	//const password = req.body.password;
	const login = 'DannyCaesar';
	const password = '1234';
	let user = null;
	mongoClient.connect(mongo_port, (error, client) => {
		if (error) { 
			console.log("Connection error on /api/login");
			res.status(400).send();
		}
		client.db(mongo_dictionary_db).collection('users').findOne({username: login, password: password}, (error, userInfo) => {
			if (!user) console.log('No such user');
			if (error) console.log(error);
			user = userInfo;
		})
	})
})

app.get('/api', (req, res) => {
	res.json(sampleData);
})

app.get('/api/words/:id', (req, res) => {
	const id = new objectId(req.params.id);
	mongoClient.connect(mongo_port, (error, client) => {
		client.db(mongo_dictionary_db).collection('words').findOne({_id: id}, (error,word) => {
			if (error) return res.status(400).send();
			res.send(word);
			client.close();
		})
	})
})

app.get('/api/words', (req, res) => {
	mongoClient.connect(mongo_port, (err, client) => {
			client.db(mongo_dictionary_db).collection("words").find({}).toArray((err,words) => {
				res.send(words);
				client.close();
		})
	})
})

app.post('/api/words', (req, res) => {
	if (req.body.groups !== undefined) req.body.groups = new objectId(req.body.groups);
	else req.body.groups = [];
	let word_id = '';

	mongoClient.connect(mongo_port, (err, client) => {

		const p = new Promise((resolve, reject) => {
			client.db(mongo_dictionary_db).collection("words").insert(req.body, (error, info) => {
				word_id = new objectId(info.insertedIds['0']);
				resolve(word_id);
				if (error) reject(error);
			});
		})
		
		p.then((word_id) => {
			if (req.body.groups !== undefined) {
				client.db(mongo_dictionary_db).collection("groups").update({_id: req.body.groups}, { $push: {words: word_id} }, (error, info) =>{
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

app.patch('/api/words', (req, res) => {
	mongoClient.connect(mongo_port, (err, client) => {
		client.db(mongo_dictionary_db).collection("words").removeOne({"english": req.body.english, "german": req.body.german, "russian": req.body.russian });
		client.close();
	})

})

app.delete('/api/words/:id', (req, res) => {
	mongoClient.connect(mongo_port, (err, client) => {
		client.db(mongo_dictionary_db).collection("words").removeOne({"_id": objectId(req.params.id)});
		client.db(mongo_dictionary_db).collection("groups").update({},{ $pull: { words: new objectId(req.params.id)} }, (err, documents) => {
			res.send('deleted');
		});
		client.close();
	})
})

app.post('/api/words/edit/:id', (req, res) => {
	
	const changeField = req.body.change;
	const changeObject = {};
	changeObject[changeField] = req.body.value;

	mongoClient.connect(mongo_port, (err, client) => {
		client.db(mongo_dictionary_db).collection("words").update({"_id": objectId(req.params.id)}, { $set: changeObject }, (err, client) => {
			if (err) console.log(err);
		})
	})

	res.send('changed');
	/*if (req.body.english!==undefined&&req.body.german!==undefined&&req.body.russian!==undefined) {
		mongoClient.connect(mongo_port, (err, client) => {
			client.db(mongo_dictionary_db).collection("words").update({"_id": objectId(req.params.id)}, { $set: {"english": req.body.english, "german": req.body.german, "russian": req.body.russian } });
			client.close();
		})
	}

	if (req.body.important!==undefined) {
		mongoClient.connect(mongo_port, (err, client) => {
			client.db(mongo_dictionary_db).collection("words").update({"_id": objectId(req.params.id)}, { $set: {"important": req.body.important } }, (err, documents) => {
				if (err) console.log(err);
				else 
					res.send('updated');
			});
			client.close();
		})
	}

	if (req.body.form !== undefined) {
		mongoClient.connect(mongo_port, (err, client) => {
			client.db(mongo_dictionary_db).collection("words").update({"_id": objectId(req.params.id)}, { $push: {forms: req.body.form }}, (error) => {
				if (error) console.log('Error adding form ' + error);
				client.close();
			})
		})
	}*/
})
	
app.post('/api/loadWords', (req, res) => {
	mongoClient.connect(mongo_port, (err, client) => {
			client.db(mongo_dictionary_db).collection("words").find({},{ fields: {_id: 0} }).toArray((err,words) => {
				fs.writeFile(req.body.url+'json/words.json',JSON.stringify(words),'utf8',(err)=> {
					if (err) return console.log(err);
					console.log('The file words.json was saved');
				});
			})
			client.db(mongo_dictionary_db).collection("groups").find({},{ fields: {_id: 0} }).toArray((err,words) => {
				fs.writeFile(req.body.url+'json/groups.json',JSON.stringify(words),'utf8',(err)=> {
					if (err) return console.log(err);
					console.log('The file groups.json was saved');
				});
			})
				res.send('Файлы сохранены');
				client.close();
		})
})


/***** GROUPS *****/
app.get('/api/groups', (req, res) => {
	mongoClient.connect(mongo_port, (err, client) => {
		client.db(mongo_dictionary_db).collection("groups").find({}).toArray((err, groups) => {
			res.json(groups);
		})
	})
})

app.get('/api/groups/:id', (req, res) => {
	mongoClient.connect(mongo_port, (err, client) => {
		client.db(mongo_dictionary_db).collection("groups").findOne({_id: new objectId(req.params.id)},(error, group) => {
			if (error) return res.status(400).send(error);
			res.send(group);
			client.close();
		})
	})
})

app.post('/api/groups', (req, res) => {
	const timestamp = new Date;
	const data = { name: req.body.name, words: [], adddate: timestamp };
	if (data.name === "") res.send({ error: "Задайте название для группы"});
	else {
		mongoClient.connect(mongo_port, (err, client) => {
			client.db(process.env.MONGO_DICTIONARY_DB).collection("groups").insert(data, (error) => {
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

app.post('/api/groups/:id', (req, res) => {
	const group_id = new objectId(req.params.id);
	const word_id = new objectId(req.body.id);
	mongoClient.connect(mongo_port, (err, client) => {
		client.db(mongo_dictionary_db).collection("groups").update({_id: group_id},{ $pull: { words: word_id } }, (err, documents) => {
			res.send('deleted');
		});
	})
})

app.delete('/api/groups/:id', (req, res) => {
	const id = new objectId(req.params.id);
	mongoClient.connect(mongo_port, (err, client) => {
		client.db(mongo_dictionary_db).collection("groups").remove({_id: id}, (error) => {
			if (error) res.send({ error: error.message });
			else res.send({ success: "Группа удалена"});
		})
	})
})


/***** FORMS *****/
app.put('/api/forms/:id', (req, res) => {
	const id = req.params.id; //Not an objectId, but Date.now()
	const word_id = new objectId(req.body.word_id);
	mongoClient.connect(mongo_port, (err, client) => {
		client.db(mongo_dictionary_db).collection("words").update({_id: word_id},{$pull: {forms: {id: id} } }, (error) => {
			if (error) res.send({ error: error.message });
			else res.send({ success: "Форма удалена"});
		})
	})
})


app.listen(port, (error) => {
	if (error) console.log('Error: ' + error);
	else console.log(`Server is running on ${port}`)
})