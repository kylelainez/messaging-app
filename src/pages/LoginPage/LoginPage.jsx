import React from 'react';
import './LoginPage.css';
import BigLogo from '../../components/BigLogo/BigLogo';
import { Grid } from 'semantic-ui-react';

export default function LoginPage(props) {
	return (
		<Grid
			divided="vertically"
			style={{ height: '100vh', padding: 0, margin: 0 }}>
			<Grid.Row style={{ padding: 0, margin: 0 }}>
				<BigLogo />
			</Grid.Row>
		</Grid>
	);
}
