const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const serversSchema = Schema({
	environment: {
		type: String,
		required: true
	},
	uri: 'String',
	port: 'String',
	https: 'Boolean',
	time: 'Number',
	path: 'String'
});

const Servers = mongoose.model('servers', serversSchema);

module.exports = Servers;