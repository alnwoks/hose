const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const grafanaSchema = new Schema({
	title: {
		type: String,
		required: [true, 'title is missing']
	},
	ruleId: {
		type: String
	},
	ruleName: {
		type: String
	},
	ruleUrl: {
		type: String
	},
	state: {
		type: String
	},
	imageUrl: {
		type: String
	},
	message: {
		type: String
	},
	evalMatches: {
		type: Array
	},
	date: { 
		type: Date, 
		default: Date.now 
	}
});

const grafanaData = mongoose.model('grafana', grafanaSchema);

module.exports = grafanaData;