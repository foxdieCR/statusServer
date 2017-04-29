'use strict'

function getAll (req, res) {
	res.writeHead(200, {"Content-Type": "text/json"});
	res.end(JSON.stringify("hola"));
}

function saveCompany (req, res) {

}

module.exports = {
	getAll,
	saveCompany
}