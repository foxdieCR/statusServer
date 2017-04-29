var models = require('../config/connection'),
	Schema = models.Schema;

var categoriesSchema = Schema({
	token: 'String',
	name: 'String'
});

var Categories = models.model('categories', categoriesSchema);

module.exports = Categories;