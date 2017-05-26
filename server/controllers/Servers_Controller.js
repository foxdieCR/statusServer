'use strict'

const serversModel = require('../models/Servers')

function getServer (req, res) {
	serversModel.findById(req.params.id, function (err, serverData) {
		if (!err) {
			console.log('Server found')
			res.status(200).json(
				serverData
			);
		} else {
			console.log('ERROR: ' + err)
			res.status(500).json({
				error: 'ERROR: ' + err
			})
		}
	});
}

function getAll (req, res) {

}

function saveServer (req, res) {
	const data = new serversModel({
		environment: req.body.environment,
		uri: req.body.uri,
		port: req.body.port,
		https: req.body.https,
		time: req.body.time,
		path: req.body.path
	})

	data.save(function (err) {
		if (!err) {
			console.log('Server Saved')
			res.status(200).json({
				id: data._id,
				environment: req.body.environment,
				uri: req.body.uri,
				port: req.body.port,
				https: req.body.https,
				time: req.body.time,
				path: req.body.path
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

module.exports = {
	getServer,
	getAll,
	saveServer,
	updateServer,
	deleteServer
}