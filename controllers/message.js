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
			const message = new Message({
				...req.body,
				message: data.Location,
				isImage: true
			});
			await message.save();
			res.status(200).json({ message });
		} catch (err) {
			res.status(400).json(err);
		}
	});
}
async function sendMessage(req, res) {
	try {
		const newMessage = new Message(req.body).populate('conversation');
		await newMessage.save();
		res.status(201).json({ newMessage });
	} catch (err) {
		res.status(400).json(err);
	}
}

async function getMessages(req, res) {
	const messages = await Message.find({
		conversation: req.params.id
	}).populate('Sender');
	res.status(200).json({ messages });
}

module.exports = {
	sendPhoto,
	sendMessage,
	getMessages
};
