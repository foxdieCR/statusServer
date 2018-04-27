const mongoose = require('mongoose')

const { Schema } = mongoose
const { ObjectId } = Schema

const categoriesSchema = Schema({
  name: 'String',
  company: { type: ObjectId, ref: 'companies' },
  servers: [{ type: ObjectId, ref: 'servers' }],
})

const Categories = mongoose.model('categories', categoriesSchema)

module.exports = Categories
