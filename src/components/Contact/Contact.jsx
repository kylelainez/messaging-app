import React from 'react';
import './Contact.css'

export default function ({ contact, handleContactClick, handleSelected }) {
	function handleClick() {
		handleContactClick(contact);
	}
	return (
		<div onClick={handleClick} className="contact">
			<img src={contact.photoUrl} alt="profile" className="contactPhoto"/>
			{contact.firstName} {contact.lastName}
		</div>
	);
}
