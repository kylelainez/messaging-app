import React from 'react';
import './MessagePage.css';
import LeftSideComponent from '../../components/LeftSideComponent/LeftSideComponent';
import ChatComponent from './../../components/ChatComponent/ChatComponent';
import { Grid } from 'semantic-ui-react';

export default function () {
	return (
		<Grid
			divided="vertically"
			style={{ height: '100vh', padding: 0, margin: 0 }}>
			<Grid.Row style={{ padding: 0, margin: 0 }} columns={2}>
				<LeftSideComponent />
				<ChatComponent />
			</Grid.Row>
		</Grid>
	);
}
