'use strict'

const companiesModel = require('../models/Companies')
const categoriesModel = require('../models/Categories')
const serversModel = require('../models/Servers')

function getCompany (req, res) {
	companiesModel.findById(req.params.id, function (err, companyData) {
		if (!err) {
			console.log('Company found')
			res.status(200).json({
				id: companyData._id,
				name: companyData.name,
				token: companyData.token,
				categories: companyData.categories
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
	companiesModel.find().then(function (companyList) {
		var companies = []
		companyList.forEach(function (companyObject) {
			companies.push({
				id: companyObject._id,
				name: companyObject.name,
				token: companyObject.token,
				categories: companyObject.categories
			})
		})
		return companies
	}).then(function (result) {
		res.status(200).json(result)
	}).catch(function (err) {
		res.status(500).json({
			error: 'ERROR: ' + err
		})
	})
}

function saveCompany (req, res) {
	const data = new companiesModel({
		name: req.body.name
	})
	data.save().then(function (companySaved) {
		return companySaved
	}).then(function (companySaved) {
		const jwt = require('jsonwebtoken')
		const tempToken = jwt.sign({ id: companySaved._id }, 'b33dd002017')
		const findBy = {
			_id: companySaved._id
		}
		const dataToUpdate = {
			token: tempToken
		}
		return companiesModel.findOneAndUpdate(findBy, dataToUpdate).then(function (result) {
			console.log('Company Saved')
			res.status(200).json({
				id: result._id,
				name: result.name,
				token: tempToken,
				categories: result.categories
			})
		})
	}).catch(function (err) {
		res.status(500).json({
			error: 'ERROR: ' + err
		})
	})
}

function updateCompany (req, res) {
	const findBy = {
		_id: req.params.id
	}
	const data = {
		name: req.body.name
	}
	companiesModel.findOneAndUpdate(findBy, data).then(function (result) {
		console.log('Company updated')
		res.status(200).json({
			id: result._id,
			name: req.body.name,
			token: result.token,
			categories: result.categories
		});
	}).catch(function (err) {
		res.status(500).json({
			error: 'ERROR: ' + err
		})
	})
}

function deleteCompany (req, res) {
	companiesModel.findById(req.params.id).populate('categories').then(function (companyData) {
		return companyData
	}).then(function (companyData) {
		var categoryIds = []
		companyData.categories.forEach(function (categoryObject) {
			categoryIds.push(categoryObject._id)
		})
		return { companyData, categoryIds }
	}).then(function ({companyData, categoryIds}) {
		return serversModel.remove({category: {$in: categoryIds}}).then(function (serversDeleted) {
			return { companyData, categoryIds }
		})
	}).then(function ({companyData, categoryIds}) {
		return categoriesModel.remove({_id: {$in: categoryIds}}).then(function (categoriesDeleted) {
			return companyData
		})
	}).then(function (companyData) {
		return companiesModel.remove({_id: companyData._id}).then(function (companyDeleted) {
			console.log('Company deleted')
			return res.status(200).json({
				id: companyData._id,
				message: "Compañia eliminada."
			})
		})
	}).catch(function (err) {
		res.status(500).json({
			error: 'ERROR: ' + err
		})
	})
}

module.exports = {
	getCompany,
	getAll,
	saveCompany,
	updateCompany,
	deleteCompany
}