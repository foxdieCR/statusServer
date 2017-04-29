'use strict'

const express = require('express')
const companyRoutes = require('./company.route')

const router = express.Router()

router.use('/companies', companyRoutes)

module.exports = router