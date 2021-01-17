import React, { useState } from 'react';
import './LoginForm.css';
import userService from '../../utils/userService';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { Grid } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

export default function LoginForm({ handleUser }) {
	const history = useHistory();
	const [state, setState] = useState({
		email: '',
		password: ''
	});
	const [error, setError] = useState('');

	function handleClick() {
		history.push('/signup');
	}

	function handleChange(e) {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			await userService.login(state);
			handleUser();
			history.push('/');
		} catch (err) {
			setError(err.message);
		}
	}

	return (
		<Grid.Column>
			<form autoComplete="off" onSubmit={handleSubmit}>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					name="email"
					placeholder="Email"
					onChange={handleChange}
					required></input>
				<label htmlFor="password">Password</label>
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
			{error ? <ErrorMessage error={error} /> : null}
			<div>
				Don't have an account?
				<span onClick={handleClick} className="signup">
					Sign Up
				</span>
			</div>
		</Grid.Column>
	);
}
