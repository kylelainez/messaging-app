import React, { useState, useEffect } from 'react';
import './ContactList.css';
import Contact from '../Contact/Contact';
import userService from '../../utils/userService';

export default function ({ handleContactClick, handleSelected, searchValue }) {
	const [users, setUsers] = useState([]);
	async function getUsers() {
		let user = await userService.getAllUsers();
		const currentUser = await userService.getUserId();
		user = user.users.filter((usr) => usr._id !== currentUser);
		setUsers([...user]);
	}

	useEffect(() => {
		getUsers();
	}, [searchValue]);

	return users
		.filter(
			(user) =>
				user.firstName
					.toLocaleLowerCase()
					.includes(searchValue.search) ||
				user.lastName
					.toLocaleLowerCase()
					.includes(searchValue.search) ||
				(
					user.firstName.toLocaleLowerCase() +
					' ' +
					user.lastName.toLocaleLowerCase()
				).includes(searchValue.search)
		)
		.map((user, idx) => (
			<Contact
				contact={user}
				handleContactClick={handleContactClick}
				handleSelected={handleSelected}
				key={`user-${idx}`}
			/>
		));
}
