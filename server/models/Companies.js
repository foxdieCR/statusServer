const mongoose = require('mongoose')

const { Schema } = mongoose.Schema
const { ObjectId } = Schema.ObjectId

const companiesSchema = Schema({
  token: 'String',
  name: 'String',
  categories: [{ type: ObjectId, ref: 'categories' }],
  user: { type: ObjectId, ref: 'users' },
})

const Companies = mongoose.model('companies', companiesSchema)

module.exports = Companies
