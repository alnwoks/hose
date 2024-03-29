const express = require('express'); // import express
const router = require('express').Router(); // import express router module

const Grafana = require('../models/grafana'); // import grafana model


// retrieve all records in the grafana collection
router.get('/', (req, res, err) => {
	if (req.query.id) {
		Grafana.findById({_id: req.query.id}).then((data) => {
			res.send(data);
		}).catch(() => {
			res.status(422).send(err);
			console.log('Error occured during GET:' + err);
		});
	} else {
		Grafana.find({}).then((data) => {
			res.send(data);
		}).catch((err) => {
			console.log('Error occured during GET: ' + err);
			res.status(422).send(err);
		});
	}
});


// post request body to the grafana collection
router.post('/', (req, res, err) => {
	Grafana.create(req.body).then((data) => {
		res.send(data._id);
		console.log('POST operation successful: ' + data);
		}).catch((err) => {
			res.status(422).send(err);
			console.log('Error occured during POST: ' + err);
	});
});


// update selected record in the grafana collection
router.put('/:id', (req, res, err) => {
	Grafana.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false}).then((data) => {
		res.send(data);
		console.log('PUT operation successful: '+ data);
	}).catch((err) => {
		res.status(422).send(err);
		console.log('Error occured during PUT: ' + err);
	});
	Grafana.findById(req.params.id).then((data) => {
		res.send(data);
		console.log('PUT operation successful: '+ data);
	});
});


// delete all doucuments in the grafana collection if no id is set
router.delete('/:id', (req, res, err) => {
	let id = req.params.id;
	Grafana.deleteOne({_id: id}).then((data) => {
		console.log('Data deleted: ' + data);
		if (data.deletedCount == 0) {
			res.send('Document with ID: ' + id + ' was not found.');
		} else {
			res.send('Document with ID: ' + id + ' has been removed.');
		}
	}).catch((err) => {
		res.status(422).send(err);
		console.log('Error occured during DELETE: ' + err);
	});
});

module.exports = router;