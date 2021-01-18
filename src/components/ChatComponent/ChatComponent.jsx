import React from 'react';
import './ChatComponent.css';
import { Grid } from 'semantic-ui-react';

export default function () {
	return (
		<Grid.Column
			id="Chat-Component"
			style={{ height: '100vh', padding: 0, margin: 0 }}>
			<Grid.Row id="TopBar">top bar</Grid.Row>
			<Grid.Row id="MessageField">
				Message Field
				<br /> test
			</Grid.Row>
			<Grid.Row id="ChatField">Chat Field</Grid.Row>
		</Grid.Column>
	);
}
