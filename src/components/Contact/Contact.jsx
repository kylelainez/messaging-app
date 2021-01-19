import React from 'react';

export default function ({ contact, handleConversation }) {
	function handleClick() {
		handleConversation(contact._id);
	}
	return (
		<div onClick={handleClick}>
			{contact.firstName} {contact.lastName}
		</div>
	);
}
