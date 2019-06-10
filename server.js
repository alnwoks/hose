const express = require('express'); //import express
const mongoose = require('mongoose'); //import mongoose
const bodyParser = require('body-parser'); //import body parser

const routes = require('./route/api'); //import routes
const dbConfig = require('./config/db.config'); // inport database config

const app = express(); //initialize express

//connect to db
mongoose.connect(dbConfig.url, dbConfig.options).then(
	() => { 
		console.log('Successfully connected to database...');
	},
	(err) => { 
		console.log('Connection Error: ', err.name);
	}
	);
mongoose.Promise = global.Promise;


// initialize express static middleware for static requests
app.use(express.static('public'))

//initialize body-parser middleware
app.use(bodyParser.json())

//initialize routes middleware
app.use('/api', routes);

//initialize error handling middleware
app.use((err, req, res) => {
	res.status(422).send({
		errorMessage: err.message
	});
});

//listen for requests on port 2000
app.listen(process.env.port || 2000 , () => {
	console.log('listening on port 2000...');
});