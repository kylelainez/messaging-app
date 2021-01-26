import React from 'react';
import './ConversationList.css';
import Conversations from '../Conversations/Conversations';

export default function ({ handleConversation, user }) {
	return (
		<div className="conversationList">
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
		</div>
	);
}
