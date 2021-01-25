const Conversation = require('../models/conversations');
const User = require('../models/user');
const ObjectId = require('mongoose').Types.ObjectId;

async function getConversation(req, res) {
	const conversation = await Conversation.findById(req.params.id);
	return res.status(201).json({ conversation });
}
async function postConversation(req, res) {
	if (req.body.currentUser === req.body.targetUser) return res.status(404);
	console.log(req.body, 'body');
	try {
		const conversation = await Conversation.findOne({
			$and: [
				{ members: new ObjectId(req.body.currentUser) },
				{ members: new ObjectId(req.body.targetUser) },
				{ members: { $size: 2 } }
			]
		});
		//Check if conversation exist
		if (conversation) {
			return res.status(201).json({ conversation });
		} else {
			// If there is no conversation,
			// Create a new Conversation with the 2 members
			const conversation = await Conversation.create({
				members: [
					new ObjectId(req.body.currentUser),
					new ObjectId(req.body.targetUser)
				]
			});
			const currentUser = await User.findById(req.body.currentUser);
			const targetUser = await User.findById(req.body.targetUser);
			console.log('currentUser', currentUser);
			currentUser.conversationList.push(conversation._id);
			targetUser.conversationList.push(conversation._id);
			await currentUser.save();
			await targetUser.save();

			return res.status(201).json({ conversation });
		}
	} catch (err) {
		console.log(err);
		throw new Error('Error Creating Conversation');
	}
}

module.exports = {
	getConversation,
	postConversation
};
