import React, { useState, useEffect } from 'react';
import './ConversationList.css';
import userService from '../../utils/userService';
import Conversations from '../Conversations/Conversations';

export default function ({ handleConversation }) {
	const [user, setUser] = useState('');
	async function getUser() {
		const getuser = await userService.getUser();
		setUser(getuser.user);
	}
	useEffect(() => {
		function getData() {
			getUser();
		}
		return getData();
	}, []);
	return (
		<>
			<div>Conversation List</div>
			{user.conversationList
				? user.conversationList.map((conversation, idx) => {
						// Will Create separate component later on
						return (
							<Conversations
								key={`conversation-${idx}`}
								handleConversation={handleConversation}
								conversation={conversation}
							/>
						);
				  })
				: ''}
		</>
	);
}
