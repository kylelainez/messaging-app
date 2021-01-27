import React from 'react';
import './MessageBubble.css';

export default function ({ message, user }) {
	return message.sender === user ? (
		 <div className="sender"> {message.isImage ? <img src={message.message} alt="" style={{'maxWidth': '400px'}}/> : message.message} </div>
	) : (
		<div className="receiver">{message.isImage ? <img src={message.message} alt="" style={{'maxWidth': '400px'}}/> : message.message}</div>
	);
}
