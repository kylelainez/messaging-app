const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
	{
		message: String,
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		conversation: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Conversation',
			required: true
		},
		isImage: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Message', messageSchema);
