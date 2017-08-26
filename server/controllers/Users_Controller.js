'use strict'

const userModel = require('../models/User')
const passport = require('passport')

function getUser (req, res) {

}

function saveUser (user) {
	console.log(user)
}

module.exports = {
	getUser,
	saveUser
}