'use strict'

const bodyParser = require('body-parser')
const express = require('express')
const config = require('./env')
const mongoose = require('mongoose');
const routes = require('../routes')

module.exports.initRoutes = function initRoutes(app) {
	app.use('/api', routes);
}

module.exports.initDB = function initDB() {
	mongoose.Promise = global.Promise
	mongoose.connect(config.mongoURL, { server: { socketOptions: {  keepAlive: 1 } } })
	mongoose.connection.on('error', (err) => {
		console.error(`Unable to connect to database: ${config.mongoURL}`)
		console.error('Por favor verificar que Mongodb esta instalado y corriendo!')
		throw err;
	})
}

module.exports.initMiddlewares = function initMiddlewares(app) {
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: false }))
}

module.exports.init = () => {
	const app = express()
	this.initMiddlewares(app)
	this.initDB()
	this.initRoutes(app)
	app.listen(config.port, (err) => {
		console.log("**********************");
		console.log("beedoo-server online");
		console.log("**********************");
	}).on('error', (err) => {
		console.error(err)
	})
	return app
}