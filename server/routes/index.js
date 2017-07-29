'use strict'

const express = require('express')
const companyRoutes = require('./company.route')
const serverRoutes = require('./server.route')
const authRoutes = require('./auth.route')

const router = express.Router()

router.use('/companies', companyRoutes)
router.use('/servers', serverRoutes)
router.use('/auth', authRoutes)

module.exports = router