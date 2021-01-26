import React from 'react';
import { useHistory } from 'react-router-dom';
import './Settings.css';
import userService from '../../utils/userService';

export default function ({ handleUser }) {
	const history = useHistory();
	async function logout(e) {
		e.preventDefault();
		await userService.logout();
		handleUser();
		history.push('/');
	}
	return (
		<>
			<form onSubmit={logout}>
				<input type="submit" value="Log out" className="logout"/>
			</form>
		</>
	);
}
