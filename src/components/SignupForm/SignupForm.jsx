import React, { useState } from 'react';
import './SignupForm.css';
import { Grid } from 'semantic-ui-react';
import userService from '../../utils/userService';

export default function () {
	const [state, setState] = useState({
		username: '',
		email: '',
		password: '',
		passwordConf: '',
		bio: ''
	});

	function handleChange(e) {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	}

	return (
		<Grid.Column>
			<form
				autoComplete="off"
				onSubmit={handleSubmit}
				enctype="multipart/form-data">
				<label for="firstName">First Name</label>
				<input
					type="text"
					name="firstName"
					placeholder="First Name"
					onChange={handleChange}
					required></input>
				<label for="lastName">Last Name</label>
				<input
					type="text"
					name="lastName"
					placeholder="Last Name"
					onChange={handleChange}
					required></input>
				<label for="email">Email</label>
				<input
					type="email"
					name="email"
					placeholder="Email"
					onChange={handleChange}
					required></input>
				<label for="password">Password</label>
				<input
					type="password"
					name="password"
					placeholder="Password"
					onChange={handleChange}
					required></input>
				<label for="passwordConf">Password</label>
				<input
					type="password"
					name="passwordConf"
					placeholder="Confirm Password"
					onChange={handleChange}
					required></input>
				<input
					type="file"
					name="photo"
					placeholder="Upload Image"
					required></input>
				<button type="submit" id="form-login">
					Sign Up
				</button>
			</form>
		</Grid.Column>
	);
}
