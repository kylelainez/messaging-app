import React from 'react';
import './Conversations.css';
import userService from '../../utils/userService'

export default function ({ conversation, handleConversation, user }) {
	function handleClick() {
		handleConversation(conversation);
	}
	return <div onClick={handleClick}> {conversation._id} </div>;
}
