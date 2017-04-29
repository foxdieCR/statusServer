var request = require('request');

exports.getHome = function (req, res) {
	res.writeHead(200, {"Content-Type": "text/json"});
	res.end(JSON.stringify("Home"));
}

exports.checkGet = function (req, res) {
	request('http://www.google.com', function (error, response, body) {
		console.log('error:', error); // Print the error if one occurred
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		console.log('body:', body); // Print the HTML for the Google homepage.
	});
	res.writeHead(200, {"Content-Type": "text/json"});
	res.end(JSON.stringify("Listo"));
}