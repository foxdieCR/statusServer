'use strict'

const express = require('express')
const serversController = require('../controllers/Servers_Controller')
const authHelper = require('../config/utils/authHelpers')

const router = express.Router()

router
  .route('/')
  .get(/* authHelper.isAuth, */ serversController.getAll)
  .post(/* authHelper.isAuth, */ serversController.saveServer)

router.route('/promises').get(serversController.testPromises)

router.route('/promises2').get(serversController.testPromises2)

router
  .route('/:id')
  .get(/* authHelper.isAuth, */ serversController.getServer)
  .put(/* authHelper.isAuth, */ serversController.updateServer)
  .delete(/* authHelper.isAuth, */ serversController.deleteServer)

module.exports = router
