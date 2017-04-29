var models = require('../config/connection'),
	Schema = models.Schema;

var companiesSchema = Schema({
	token: 'String',
	name: 'String'
});

var Companies = models.model('companies', companiesSchema);

module.exports = Companies;