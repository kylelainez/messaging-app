import React from 'react';
import './HomePage.css';
import BigLogo from '../../components/BigLogo/BigLogo';
import LandingMessage from '../../components/LandingMessage/LandingMessage';
import { Grid } from 'semantic-ui-react';

export default function LoginPage({ user }) {
	return (
		<Grid
			divided="vertically"
			style={{ height: '100vh', padding: 0, margin: 0 }}>
			<Grid.Row style={{ padding: 0, margin: 0 }}>
				<BigLogo />
				<LandingMessage />
			</Grid.Row>
		</Grid>
	);
}
