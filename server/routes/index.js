'use strict'

const express = require('express')
const companyRoutes = require('./company.route')
const serverRoutes = require('./server.route')
const categoryRoutes = require('./category.route')

const router = express.Router()

router.use('/companies', companyRoutes)
router.use('/servers', serverRoutes)
router.use('/categories', categoryRoutes)

module.exports = router