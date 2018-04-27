const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = Schema({
  token: 'String',
  username: 'String',
  name: 'String',
  lastName: 'String',
  secondLastName: '',
  createdAt: 'Date',
  updateAt: 'Date',
  email: 'String',
  facebook: 'Number',
  google: 'Number',
  phone: 'String',
  password: 'String',
  status: 'Number',
  verifiedAccount: 'Number',
  avatar: 'String',
  gender: 'String',
})

const Users = mongoose.model('users', userSchema)

module.exports = Users
