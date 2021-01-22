import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './SignupForm.css';
import { Grid } from 'semantic-ui-react';
import userService from '../../utils/userService';

export default function ({ handleUser }) {
	const [error, setError] = useState('');
	const [selectedFile, setSelectedFile] = useState('');
	const [state, setState] = useState({
		username: '',
		email: '',
		password: '',
		passwordConf: ''
	});
	const history = useHistory();

	function handleChange(e) {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();

		if (state.password !== state.passwordConf) {
			alert('password does not match');
			return;
		}

		const formData = new FormData();

		formData.append('photo', selectedFile);

		for (let key in state) {
			formData.append(key, state[key]);
		}

		try {
			await userService.signup(formData);
			handleUser();
			history.push('/');
		} catch (err) {
			console.log(err);
			setError(err.message);
		}
	}

	function handleFileInput(e) {
		setSelectedFile(e.target.files[0]);
	}

	function handleClick() {
		history.push('/login');
	}

	return (
		<Grid.Column>
			<form
				autoComplete="off"
				onSubmit={handleSubmit}
				encType="multipart/form-data">
				<label htmlFor="firstName">First Name</label>
				<input
					type="text"
					name="firstName"
					placeholder="First Name"
					onChange={handleChange}
					required></input>
				<label htmlFor="lastName">Last Name</label>
				<input
					type="text"
					name="lastName"
					placeholder="Last Name"
					onChange={handleChange}
					required></input>
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
				<label htmlFor="passwordConf">Password</label>
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
					onChange={handleFileInput}
					required></input>
				<button type="submit" id="form-login">
					Sign Up
				</button>
			</form>
			{error ? <ErrorMessage error={error} /> : null}
			<div>
				Already have an account?
				<span onClick={handleClick} className="login">
					Log in
				</span>
			</div>
		</Grid.Column>
	);
}
