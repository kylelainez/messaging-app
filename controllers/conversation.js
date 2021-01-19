const Conversation = require('../models/conversations');
const ObjectId = require('mongoose').Types.ObjectId;

function getConversation(req, res) {
	console.log(req.body);
	return;
}
async function postConversation(req, res) {
	console.log(req.body);
	if (req.body.currentUser === req.body.targetUser) return res.status(404);
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
			return res.status(201).json({ conversation: conversation._id });
		} else {
			// If there is no conversation,
			// Create a new Conversation with the 2 members
			const newConversation = await Conversation.create({
				members: [
					new ObjectId(req.body.currentUser),
					new ObjectId(req.body.targetUser)
				]
			});
			return res.status(201).json({ conversation: newConversation._id });
		}
	} catch (err) {
		throw new Error('Error Creating Conversation');
	}
}

module.exports = {
	getConversation,
	postConversation
};
