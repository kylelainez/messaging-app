import React from 'react';
import './Contact.css'

export default function ({ contact, handleContactClick, handleSelected }) {
	function handleClick() {
		handleContactClick(contact);
	}
	return (
		<div onClick={handleClick} class="contact">
			<img src={contact.photoUrl} alt="profile" class="contactPhoto"/>
			{contact.firstName} {contact.lastName}
		</div>
	);
}
