const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.REACT_APP_SECRET;
const { v4: uuidv4 } = require('uuid');
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3();
module.exports = {
	signup,
	login,
	index,
	getUser
};

function signup(req, res) {
	const filePath = `${uuidv4()}/${req.file.originalname}`;
	const params = {
		Bucket: 'catcollector1205',
		Key: filePath,
		Body: req.file.buffer
	};

	s3.upload(params, async (err, data) => {
		try {
			const user = new User({ ...req.body, photoUrl: data.Location });
			await user.save();
			const token = createJWT(user);
			res.json({ token });
		} catch (err) {
			// Probably a duplicate email
			res.status(400).json(err);
		}
	});
}

async function login(req, res) {
	try {
		const user = await User.findOne({ email: req.body.email });
		user.comparePassword(req.body.password, (err, isMatch) => {
			if (isMatch) {
				const token = createJWT(user);
				res.json({ token });
			} else {
				return res.status(401).json({ err: 'bad credentials' });
			}
		});
	} catch (err) {
		return res.status(401).json(err);
	}
}

async function index(req, res) {
	try {
		const users = await User.find({}).exec();
		res.status(200).json({ users: users });
	} catch (err) {}
}

async function getUser(req, res) {
	try {
		const user = await User.findById(req.params.id).populate(
			'conversationList'
		);
		return res.status(200).json({ user });
	} catch (err) {}
}

/*----- Helper Functions -----*/

function createJWT(user) {
	return jwt.sign(
		{ user }, // data payload
		SECRET,
		{ expiresIn: '24h' }
	);
}
