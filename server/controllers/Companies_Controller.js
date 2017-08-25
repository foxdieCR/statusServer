const companiesModel = require('../models/Companies');
const categoriesModel = require('../models/Categories');
const serversModel = require('../models/Servers');

function getCompany(req, res) {
  // se hace un find por id de la compañia
  companiesModel.findById(req.params.id).then((companyData) => {
    console.log('Company found');
    // se crea una estructura solo con la info que se necesita
    res.status(200).json({
      id: companyData._id,
      name: companyData.name,
      token: companyData.token,
      categories: companyData.categories,
    });
  }).catch((err) => {
    // en caso de error se devuelve el error
    console.log(`ERROR: ${err}`);
    res.status(500).json({
      error: `ERROR: ${err}`,
    });
  });
}

function getAll(req, res) {
  // se hace un find de todas las compañias
  companiesModel.find().then((companyList) => {
    const companies = [];
    // se hace un loop para agregar solo la info de las compañias que se necesita
    // TODO paginación
    companyList.forEach((companyObject) => {
      companies.push({
        id: companyObject._id,
        name: companyObject.name,
        token: companyObject.token,
        categories: companyObject.categories,
      });
    });
    return companies;
  }).then((result) => {
    // se retorna la info de la compañias
    res.status(200).json(result);
  }).catch((err) => {
    // en caso de error se devuelve el error
    res.status(500).json({
      error: `ERROR: ${err}`,
    });
  });
}

function saveCompany(req, res) {
  const data = new companiesModel({
    name: req.body.name,
  });
  data.save().then(companySaved => // se salva la compañia
		 companySaved,
  ).then((companySaved) => {
    // se crea un token para la compañia
    const jwt = require('jsonwebtoken');
    const tempToken = jwt.sign({ id: companySaved._id }, 'b33dd002017');
    const findBy = {
      _id: companySaved._id,
    };
    const dataToUpdate = {
      token: tempToken,
    };
    // se actualiza la compañia con el token
    return companiesModel.findOneAndUpdate(findBy, dataToUpdate).then((result) => {
      console.log('Company Saved');
      // se crea una estructura solo con la info que se necesita
      res.status(200).json({
        id: result._id,
        name: result.name,
        token: tempToken,
        categories: result.categories,
      });
    });
  }).catch((err) => {
    // en caso de error se devuelve el error
    res.status(500).json({
      error: `ERROR: ${err}`,
    });
  });
}

function updateCompany(req, res) {
  const findBy = {
    _id: req.params.id,
  };
  const data = {
    name: req.body.name,
  };
  // se busca y se actualiza el nombre de la compañia, solo eso se permite de momento
  companiesModel.findOneAndUpdate(findBy, data).then((companyUpdated) => {
    console.log('Company updated');
    // se crea una estructura solo con la info que se necesita
    res.status(200).json({
      id: companyUpdated._id,
      name: req.body.name,
      token: companyUpdated.token,
      categories: companyUpdated.categories,
    });
  }).catch((err) => {
    // en caso de error se devuelve el error
    res.status(500).json({
      error: `ERROR: ${err}`,
    });
  });
}

function deleteCompany(req, res) {
  // se busca primero la información de la compañia populado con las categorias
  companiesModel.findById(req.params.id).populate('categories').then(companyData => companyData).then((companyData) => {
    const categoryIds = [];
    // se llena un arreglo con los ids de las categorias de la compañia
    companyData.categories.forEach((categoryObject) => {
      categoryIds.push(categoryObject._id);
    });
    return { companyData, categoryIds };
  }).then(({ companyData, categoryIds }) =>
    // se elimina todos los servidores que pertenezcan a todas las categorias que esten en el arreglo
		 serversModel.remove({ category: { $in: categoryIds } }).then(serversDeleted => ({ companyData, categoryIds })),
  ).then(({ companyData, categoryIds }) =>
    // se elimina todas las categorias que este en el arreglo
		 categoriesModel.remove({ _id: { $in: categoryIds } }).then(categoriesDeleted => companyData),
  ).then(companyData =>
    // por ultimo se borra la compañia
		 companiesModel.remove({ _id: companyData._id }).then((companyDeleted) => {
      console.log('Company deleted');
      // se retorna cierta información indicando que fue eliminada
      return res.status(200).json({
        id: companyData._id,
        message: 'Compañia eliminada.',
      });
    }),
  ).catch((err) => {
    // en caso de error se devuelve el error
    res.status(500).json({
      error: `ERROR: ${err}`,
    });
  });
}

module.exports = {
  getCompany,
  getAll,
  saveCompany,
  updateCompany,
  deleteCompany,
};
