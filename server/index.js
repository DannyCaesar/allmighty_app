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
		client.db("test_db").collection("words").insert(req.body);
		client.close();
	})
})

app.patch('/api/words', (req, res) => {
	mongoClient.connect(process.env.MONGO_PORT_DEV, (err, client) => {
		client.db("test_db").collection("words").removeOne({"english": req.body.english, "german": req.body.german, "russian": req.body.russian });
		client.close();
	})

})

app.delete('/api/delete/:id', (req, res) => {
	mongoClient.connect(process.env.MONGO_PORT_DEV, (err, client) => {
		client.db("test_db").collection("words").removeOne({"_id": objectId(req.params.id)});
		client.close();
	})
})

app.post('/api/words/edit/:id', (req, res) => {
	if (req.body.english!==undefined&&req.body.german!==undefined&&req.body.russian!==undefined) {
		mongoClient.connect(process.env.MONGO_PORT_DEV, (err, client) => {
			client.db("test_db").collection("words").update({"_id": objectId(req.params.id)}, { $set: {"english": req.body.english, "german": req.body.german, "russian": req.body.russian } });
			client.close();
		})
	}

	if (req.body.important!==undefined) {
		mongoClient.connect(process.env.MONGO_PORT_DEV, (err, client) => {
			client.db("test_db").collection("words").update({"_id": objectId(req.params.id)}, { $set: {"important": req.body.important } });
			client.close();
		})
	}
})
	
app.post('/api/loadWords', (req, res) => {
	mongoClient.connect(process.env.MONGO_PORT_DEV, (err, client) => {
			client.db("test_db").collection("words").find({}).toArray((err,words) => {
				fs.writeFile(req.body.url+'words.json',JSON.stringify(words),'utf8',(err)=> {
					if (err) return console.log(err);
					res.send('Файл сохранен');
					console.log('The file was saved');
				});
				client.close();
		})
	})
})


app.listen(process.env.SERVER_PORT_DEV, (error) => {
	if (error) console.log('Error: ' + error);
	else console.log(`Server is running on ${process.env.SERVER_PORT_DEV}`)
})