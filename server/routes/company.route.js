'use strict'

const express = require('express')
const companiesController = require('../controllers/Companies_Controller')

const router = express.Router()

router.route('/')
	.get(companiesController.getAll)
	.post(companiesController.saveCompany)

module.exports = router