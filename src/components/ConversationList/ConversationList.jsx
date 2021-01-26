import React, { useState, useEffect } from 'react';
import './ConversationList.css';
import userService from '../../utils/userService';
import Conversations from '../Conversations/Conversations';

export default function ({ handleConversation, user }) {
	return (
		<>
			{user
				? user.conversationList.map((conversation, idx) => {
						// Will Create separate component later on
						return (
							<Conversations
								key={`conversation-${idx}`}
								handleConversation={handleConversation}
								conversation={conversation}
								user={user}
							/>
						);
				  })
				: ''}
		</>
	);
}
