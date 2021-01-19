import React, { useState, useEffect } from 'react';
import './ConversationList.css';
import { Grid } from 'semantic-ui-react';
import userService from '../../utils/userService';
import Contact from '../Contact/Contact';

export default function ({ handleConversation, user }) {
	const [contacts, setContacts] = useState([]);
	async function getUsers() {
		try {
			const users = await userService.getAllUsers();
			setContacts([...users.users]);
		} catch (err) {
			console.log(err);
		}
	}
	useEffect(() => {
		getUsers();
	}, []);
	return (
		<>
			<div>Conversation List</div>
			{contacts.length
				? contacts.map((contact, idx) => {
						// Will Create separate component later on
						if (contact._id !== user._id)
							return (
								<Contact
									key={`contact${idx}`}
									handleConversation={handleConversation}
									contact={contact}
								/>
							);
				  })
				: ''}
		</>
	);
}
