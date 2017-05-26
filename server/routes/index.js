'use strict'

const express = require('express')
const companyRoutes = require('./company.route')
const serverRoutes = require('./server.route')

const router = express.Router()

router.use('/companies', companyRoutes)
router.use('/servers', serverRoutes)

module.exports = router