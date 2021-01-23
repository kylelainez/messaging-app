import React from 'react';
import messageService from '../../utils/messageService';
import './MessageBubble.css';

export default function ({ message, user }) {
	console.log('here');
	return message.sender === user ? (
		<div className="sender">{message.message}</div>
	) : (
		<div className="receiver">{message.message}</div>
	);
}
