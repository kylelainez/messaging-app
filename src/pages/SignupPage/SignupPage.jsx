import React from 'react';
import './SignupPage.css';
import BigLogo from '../../components/BigLogo/BigLogo';
import SignupForm from '../../components/SignupForm/SignupForm';
import { Grid } from 'semantic-ui-react';

export default function SignUpPage({ handleUser }) {
	return (
		<Grid
			divided="vertically"
			style={{ height: '100vh', padding: 0, margin: 0 }}>
			<Grid.Row style={{ padding: 0, margin: 0 }}>
				<BigLogo />
				<SignupForm handleUser={handleUser} />
			</Grid.Row>
		</Grid>
	);
}
