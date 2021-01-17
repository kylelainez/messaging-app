import React from 'react';
import './LoginPage.css';
import BigLogo from '../../components/BigLogo/BigLogo';
import LoginForm from '../../components/LoginForm/LoginForm';
import { Grid } from 'semantic-ui-react';

export default function LoginPage({ handleUser }) {
	return (
		<Grid
			divided="vertically"
			style={{ height: '100vh', padding: 0, margin: 0 }}>
			<Grid.Row style={{ padding: 0, margin: 0 }}>
				<BigLogo />
				<LoginForm handleUser={handleUser} />
			</Grid.Row>
		</Grid>
	);
}
