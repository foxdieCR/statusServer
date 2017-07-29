;

const companies = require('../models/Companies');

function getAll(req, res) {
  res.status(200).json({
    test: 'hola',
  });
}

function saveCompany(req, res) {
  const data = new companies({
    token: req.body.token,
    name: req.body.name,
  });

  data.save((err) => {
		if (!err) {
			console.log('Save')
			res.status(200).json({
				token: req.body.token,
				name: req.body.name
			});
		} else {
			console.log('ERROR: ' + err)
			res.status(500).json({
				error: 'ERROR: ' + err
			});
		}
	});
}

module.exports = {
  getAll,
  saveCompany,
};
