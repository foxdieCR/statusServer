'use strict'

const express = require('express')

const { signIn } = require('../controllers/authController')

const router = express.Router()

router.route('/signin')
  .post(signIn)
router.route('/signup')
router.route('/signout')
router.route('/google')
router.route('/google/callback')
router.route('/github/callback')
router.route('/github/callback')

module.exports = router
