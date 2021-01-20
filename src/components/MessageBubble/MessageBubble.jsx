import React from 'react';
import './MessageBubble.css';

export default function ({ message, conversation, user }) {
	if (!conversation.conversation) return <> </>;
	const { text, sender } = message;
	return conversation.conversation._id === message.conversation ? (
		sender === user ? (
			<div className="sender">{text}</div>
		) : (
			<div className="receiver">{text}</div>
		)
	) : (
		''
	);
}
