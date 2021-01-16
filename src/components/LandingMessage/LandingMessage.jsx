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
				<h1>Messaging App</h1>
				<span>
					Lorem Ipsum is simply dummy text of the printing and
					typesetting industry. Lorem Ipsum has been the industry's
					standard dummy text ever since the 1500s, when an unknown
					printer took a galley of type and scrambled it to make a
					type specimen book.
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
