'use strict'

const express = require('express')
const companiesController = require('../controllers/Companies_Controller')
const authHelper = require('../config/utils/authHelpers')

const router = express.Router()

router
  .route('/')
  .get(/* authHelper.isAuth, */ companiesController.getAll)
  .post(/* authHelper.isAuth, */ companiesController.saveCompany)

router
  .route('/:id')
  .get(/* authHelper.isAuth, */ companiesController.getCompany)
  .put(/* authHelper.isAuth, */ companiesController.updateCompany)
  .delete(/* authHelper.isAuth, */ companiesController.deleteCompany)

module.exports = router
