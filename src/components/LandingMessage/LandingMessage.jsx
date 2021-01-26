import React from 'react';
import './LandingMessage.css';
import { Grid } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';

export default function () {
	const history = useHistory();

	function handleLogin() {
		history.push('/login');
	}

	function handleSignup() {
		history.push('/signup');
	}

	return (
		<Grid.Column
			className="LandingMessage"
			width={8}
			style={{ padding: 0, margin: 0 }}>
			<div className="content">
				<h1>Convey<span class="period">.</span></h1>
				<span>
					Convey is a real time messaging app made with MongoDB, Express, React and Node.
				</span>
				<Grid.Row>
					<button
						id="login"
						className="landing-button"
						onClick={handleLogin}>
						Log in
					</button>
					<Link to="/signup">
						<button
							id="signup"
							className="landing-button"
							onClick={handleSignup}>
							Sign up
						</button>
					</Link>
				</Grid.Row>
			</div>
		</Grid.Column>
	);
}
