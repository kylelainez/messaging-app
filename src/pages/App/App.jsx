import React, { useState } from 'react';

import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import HomePage from '../HomePage/HomePage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import MessagePage from '../MessagePage/MessagePage';
import userService from '../../utils/userService';

function App() {
	const [user, setUser] = useState(userService.getUser());
	const history = useHistory();

	function handleUser() {
		setUser(userService.getUser());
	}

	return (
		<div className="App">
			<Switch>
				<Route
					exact
					path="/"
					render={() =>
						user ? (
							<Redirect to="/messages" />
						) : (
							<HomePage user={user} />
						)
					}
				/>
				<Route
					exact
					path="/login"
					render={() =>
						user ? (
							<Redirect to="/messages" />
						) : (
							<LoginPage handleUser={handleUser} />
						)
					}
				/>
				<Route
					exact
					path="/signup"
					render={() =>
						user ? (
							<Redirect to="/messages" />
						) : (
							<SignupPage handleUser={handleUser} />
						)
					}
				/>
				<Route
					exact
					path="/messages"
					render={() =>
						user ? (
							<MessagePage user={user} />
						) : (
							<Redirect to="/login" />
						)
					}
				/>
			</Switch>
		</div>
	);
}

export default App;
