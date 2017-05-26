const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const companiesSchema = Schema({
	token: 'String',
	name: 'String'
});

const Companies = mongoose.model('companies', companiesSchema);

module.exports = Companies;