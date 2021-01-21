import React from 'react';

export default function ({ contact, handleContactClick, handleSelected }) {
	function handleClick() {
		handleContactClick(contact._id);
		// handleSelected('messages');
	}
	return (
		<div onClick={handleClick}>
			{contact.firstName} {contact.lastName}
		</div>
	);
}
