import React from 'react';
import './Conversations.css';

export default function ({ conversation, handleConversation }) {
	function handleClick() {
		handleConversation(conversation);
	}
	return <div onClick={handleClick}> {conversation._id} </div>;
}
