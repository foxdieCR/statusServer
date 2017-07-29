const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

const serversSchema = Schema({
	environment: {
		type: String,
		required: true
	},
	uri: 'String',
	port: 'String',
	https: 'Boolean',
	time: 'Number',
	path: 'String',
	category: {type: ObjectId, ref: 'categories'}
});

const Servers = mongoose.model('servers', serversSchema);

module.exports = Servers;