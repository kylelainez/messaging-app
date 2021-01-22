const { v4: uuidv4 } = require('uuid');
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3();
const Message = require('../models/message');

function sendPhoto(req, res) {
	const filePath = `${uuidv4()}/${req.file.originalname}`;
	const params = {
		Bucket: 'catcollector1205',
		Key: filePath,
		Body: req.file.buffer
	};

	s3.upload(params, async (err, data) => {
		try {
			// Upload Message and Save to Database
		} catch (err) {
			// Probably a duplicate email
		}
	});
}
function sendMessage(req, res) {}

module.exports = {
	sendPhoto,
	sendMessage
};
