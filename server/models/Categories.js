const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

const categoriesSchema = Schema({
	name: 'String',
	company: {type: ObjectId, ref: 'companies'},
	servers: [{type: ObjectId, ref: 'servers'}]
});

const Categories = mongoose.model('categories', categoriesSchema);

module.exports = Categories;