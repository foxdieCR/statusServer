'use strict'

const categoriesModel = require('../models/Categories')
const companiesModel = require('../models/Companies')

function getCategory (req, res) {
	//se hace un find por id de la categoria
	categoriesModel.findById(req.params.id).then(function (categoryData) {
		console.log('Company found')
		// se crea una estructura solo con la info que se necesita
		res.status(200).json({
			id: categoryData._id,
			name: categoryData.name,
			company: categoryData.company,
			servers: categoryData.servers
		})
	}).catch(function (err) {
		// en caso de error se devuelve el error
		console.log('ERROR: ' + err)
		res.status(500).json({
			error: 'ERROR: ' + err
		})
	})
}

function getAll (req, res) {
	// se hace un find de todas las categorias
	categoriesModel.find().then(function (categoryList) {
		var categories = []
		//se hace un loop para agregar solo la info de las categorias que se necesita
		//TODO paginación
		categoryList.forEach(function (categoryObject) {
			categories.push({
				id: categoryObject._id,
				name: categoryObject.name,
				company: categoryObject.company,
				servers: categoryObject.servers
			})
		})
		return categories
	}).then(function (result) {
		// se retorna la info de la categorias
		res.status(200).json(result)
	}).catch(function (err) {
		res.status(500).json({
			error: 'ERROR: ' + err
		})
	})
}

function saveCategory (req, res) {
	const data = new categoriesModel(req.body)
	data.save().then(function (categorySaved) { //se salva la categoria
		return categorySaved
	}).then(function (categoryData) {
		//se busca la info de la compañia para actualizarle la categoria
		return companiesModel.findById(categoryData.company).then(function (companyData) {
			return {categoryData, companyData}
		})
	}).then(function ({categoryData, companyData}) {
		var tempCategories = companyData.categories
		tempCategories.push(categoryData._id)
		const findBy = {
			_id: categoryData.company
		}
		const data = {
			categories: tempCategories
		}
		//se llena la info de la compañia y se actualiza sus categorias
		return companiesModel.update(findBy, data).then(function (companyUpdated) {
			return categoryData
		})
	}).then(function (categoryData) {
		console.log('Category Saved')
		// se responde que se guardo la categoria y se devuelve cierta info necesaria
		res.status(200).json({
			id: categoryData._id,
			name: categoryData.name,
			company: categoryData.company,
			servers: categoryData.servers
		})
	}).catch(function (err) {
		res.status(500).json({
			error: 'ERROR: ' + err
		})
	})
}

function updateCategory (req, res) {
	const findBy = {
		_id: req.params.id
	}
	const data = {
		name: req.body.name
	}
	// se busca y se actualiza el nombre de la categoria, solo eso se permite de momento
	categoriesModel.findOneAndUpdate(findBy, data).then(function (categoryUpdated) {
		console.log('Category updated')
		// se crea una estructura solo con la info que se necesita
		res.status(200).json({
			id: categoryUpdated._id,
			name: req.body.name,
			company: categoryUpdated.company,
			servers: categoryUpdated.servers
		});
	}).catch(function (err) {
		// en caso de error se devuelve el error
		res.status(500).json({
			error: 'ERROR: ' + err
		})
	})
}

function deleteCategory (req, res) {

}

module.exports = {
	getCategory,
	getAll,
	saveCategory,
	updateCategory,
	deleteCategory
}