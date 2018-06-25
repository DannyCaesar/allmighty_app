const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
require('dotenv').load();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const sampleData = {
	id: "0",
	english: "cat",
	german: "die Katze",
	russian: "кошка"
}

app.get('/', (req, res) => {
	res.json({message: 'Allmighty server'});
})

app.get('/api', (req, res) => {
	res.json(sampleData);
})

app.get('/api/words/:id', (req, res) => {
	const id = new objectId(req.params.id);
	mongoClient.connect(process.env.MONGO_PORT_DEV, (error, client) => {
		client.db('test_db').collection('words').findOne({_id: id}, (error,word) => {
			if (error) return res.status(400).send();
			res.send(word);
			client.close();
		})
	})
})

app.get('/api/words', (req, res) => {
	mongoClient.connect(process.env.MONGO_PORT_DEV, (err, client) => {
			client.db("test_db").collection("words").find({}).toArray((err,words) => {
				res.send(words);
				client.close();
		})
	})
})

app.post('/api/words', (req, res) => {
	mongoClient.connect(process.env.MONGO_PORT_DEV, (err, client) => {
		client.db("test_db").collection("words").insertOne(req.body);
		client.close();
	})
})

app.patch('/api/words', (req, res) => {
	mongoClient.connect(process.env.MONGO_PORT_DEV, (err, client) => {
		client.db("test_db").collection("words").removeOne({"english": req.body.english, "german": req.body.german, "russian": req.body.russian });
		client.close();
	})

})
	

app.listen(process.env.SERVER_PORT_DEV, (error) => {
	if (error) console.log('Error: ' + error);
	else console.log(`Server is running on ${process.env.SERVER_PORT_DEV}`)
})