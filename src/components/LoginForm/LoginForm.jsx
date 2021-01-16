import React, { useState } from 'react';
import './LoginForm.css';
import { Grid } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

export default function () {
	const history = useHistory();
	const [state, setState] = useState({
		username: '',
		email: ''
	});

	function handleClick() {
		history.push('/signup');
	}

	function handleChange(e) {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	}
	return (
		<Grid.Column>
			<form autoComplete="off">
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
				<button type="submit" id="form-login">
					Log in
				</button>
			</form>
			<div>
				Don't have an account?
				<span onClick={handleClick} class="signup">
					Sign Up
				</span>
			</div>
		</Grid.Column>
	);
}
