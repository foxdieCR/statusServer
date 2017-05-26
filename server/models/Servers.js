const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const serversSchema = Schema({
	token: 'String',
	name: 'String'
});

const Servers = mongoose.model('servers', serversSchema);

module.exports = Servers;