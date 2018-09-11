const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
const fs = require('fs');
const config = require('./server.config.js');
const cookieParser = require('cookie-parser');
require('dotenv').load();

const routes = require('./controllers');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../build')));
app.use(cookieParser());
app.use('/',routes);


app.listen(config.port, (error) => {
	if (error) console.log('Error: ' + error);
	else console.log(`Server is running on ${config.port}`)
})