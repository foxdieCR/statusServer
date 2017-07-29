'use strict'

const serversModel = require('../models/Servers')

function getServer (req, res) {
	serversModel.findById(req.params.id, function (err, serverData) {
		if (!err) {
			console.log('Server found')
			res.status(200).json({
				id: serverData._id,
				environment: serverData.environment,
				uri: serverData.uri,
				port: serverData.port,
				https: serverData.https,
				time: serverData.time,
				path: serverData.path
			})
		} else {
			console.log('ERROR: ' + err)
			res.status(500).json({
				error: 'ERROR: ' + err
			})
		}
	});
}

function getAll (req, res) {
	console.log('Definido?', typeof req.query.environment)
	const filters = {}
	if (typeof req.query.environment !== 'undefined') {
		filters.environment = req.query.environment
	}

	serversModel.find(filters).then(function (serverList) {
		var servers = []
		serverList.forEach(function (serverObject) {
			servers.push({
				id: serverObject._id,
				environment: serverObject.environment,
				uri: serverObject.uri,
				port: serverObject.port,
				https: serverObject.https,
				time: serverObject.time,
				path: serverObject.path
			})
		})
		return servers
	}).then(function (result) {
		res.status(200).json(result)
	}).catch(function (err) {
		res.status(500).json({
			error: 'ERROR: ' + err
		})
	})
}

function saveServer (req, res) {
	const data = new serversModel(req.body)

	data.save(function (err) {
		if (!err) {
			console.log('Server Saved')
			res.status(200).json({
				id: data._id,
				environment: data.environment,
				uri: data.uri,
				port: data.port,
				https: data.https,
				time: data.time,
				path: data.path
			})
		} else {
			console.log('ERROR: ' + err)
			res.status(500).json({
				error: 'ERROR: ' + err
			})
		}
	})
}

function updateServer (req, res) {
	const findBy = {
		_id: req.params.id
	}
	const data = {
		environment: req.body.environment,
		uri: req.body.uri,
		port: req.body.port,
		https: req.body.https,
		time: req.body.time,
		path: req.body.path
	}
	serversModel.findOneAndUpdate(findBy, data, function (err) {
		if (!err) {
			console.log('Server updated')
			res.status(200).json({
				id: req.params.id,
				environment: req.body.environment,
				uri: req.body.uri,
				port: req.body.port,
				https: req.body.https,
				time: req.body.time,
				path: req.body.path
			});
		} else {
			console.log('ERROR: ' + err)
			res.status(500).json({
				error: 'ERROR: ' + err
			})
		}
	})
}

function deleteServer (req, res) {
	serversModel.remove({ _id: req.params.id }, function (err) {
		if (!err) {
			console.log('Server deleted')
			res.status(200).json({
				id: req.params.id,
				message: "Servidor eliminado."
			});
		} else {
			console.log('ERROR: ' + err)
			res.status(500).json({
				error: 'ERROR: ' + err
			})
		}
	})
}

function testPromises2(req, res) {
	// Promise.all ejecuta las promesas al mismo tiempo
	return Promise.all([
			serversModel.find(),
			serversModel.findById('595b02bfeb8cfc59979a4aa6')
		])
		.then(function ([result1, result2]) {
			res.status(200).json({ result1, result2 })
		})
}

function testPromises(req, res) {
	serversModel
		.find()
		.then(function (result) {
			return serversModel.findById(result[1]._id)
			.then(function (result2) {
				return { result, result2 }
			})
		})
		.then(function ({ result, result2 }) {
			return serversModel.findById(result[2]._id)
			.then(function (result3) {
				res.status(200).json({ result, result2, result3 })
			})
		})
		.catch(function (err) {
			res.status(500).json({
				error: 'ERROR: ' + err
			})
		})
}

module.exports = {
	getServer,
	getAll,
	saveServer,
	updateServer,
	deleteServer,
	testPromises,
	testPromises2,
}