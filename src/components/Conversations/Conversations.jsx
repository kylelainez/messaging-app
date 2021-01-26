import React, { useEffect, useState } from 'react';
import './Conversations.css';
import userService from '../../utils/userService'

export default function ({ conversation, handleConversation, user }) {
	const [name, setName] = useState('');

	async function getUser(id){
		const convUser = await userService.getUserFromId(id);
		console.log(convUser, 'here');
		setName(convUser.user);
	}

	useEffect(() => {
		for(let member of conversation.members){
			if(member !== user._id){
				getUser(member);		
			}
		};
	},[conversation.members, user._id])
	function handleClick() {
		handleConversation(conversation, name);
	}
	return <div onClick={handleClick} className="contact">
		<img src={name.photoUrl} alt="profile" className="contactPhoto"/>
		{name.firstName} {name.lastName}
	</div>
}
