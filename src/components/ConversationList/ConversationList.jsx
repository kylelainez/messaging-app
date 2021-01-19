import React, { useState } from 'react';
import './ConversationList.css';
import { Grid } from 'semantic-ui-react';
import userService from '../../utils/userService';

export default function () {
	const [contacts, setContacts] = useState([]);
	async function getUsers() {
		try {
			const users = await userService.getAllUsers();
			setContacts([...users.users]);
		} catch (err) {
			console.log(err);
		}
	}
	return (
		<>
			<div onClick={getUsers}>Conversation List</div>
			{contacts.length
				? contacts.map((contact, idx) => (
						<div key={`contact-${idx}`}>
							{contact.firstName} {contact.lastName}
						</div>
				  ))
				: ''}
		</>
	);
}
