const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const categoriesSchema = Schema({
	token: 'String',
	name: 'String'
});

const Categories = mongoose.model('categories', categoriesSchema);

module.exports = Categories;