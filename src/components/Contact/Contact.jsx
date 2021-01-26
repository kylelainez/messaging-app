import React from 'react';
import './Contact.css'

export default function ({ contact, handleContactClick, handleSelected }) {
	function handleClick() {
		handleContactClick(contact._id);
		// handleSelected('messages');
	}
	return (
		<div onClick={handleClick} class="contact">
			<img src={contact.photoUrl} alt="profile photo" class="contactPhoto"/>
			{contact.firstName} {contact.lastName}
		</div>
	);
}
