import React from 'react';
import './MessageBubble.css';

export default function ({ message, user }) {
	return message.sender === user ? (
		<div className="sender">{message.message}</div>
	) : (
		<div className="receiver">{message.message}</div>
	);
}
