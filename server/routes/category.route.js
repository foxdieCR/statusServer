'use strict'

const express = require('express')
const categoriesController = require('../controllers/Categories_Controller')
const authHelper = require('../config/utils/authHelpers')

const router = express.Router()

router
  .route('/')
  .get(/* authHelper.isAuth, */ categoriesController.getAll)
  .post(/* authHelper.isAuth, */ categoriesController.saveCategory)

router
  .route('/:id')
  .get(/* authHelper.isAuth, */ categoriesController.getCategory)
  .put(/* authHelper.isAuth, */ categoriesController.updateCategory)
  .delete(/* authHelper.isAuth, */ categoriesController.deleteCategory)

module.exports = router
