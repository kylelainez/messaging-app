import React from 'react';
import './ChatComponent.css';
import { Grid } from 'semantic-ui-react';
import Image from '../../images/insert_photo-24px.svg';

export default function () {
	return (
		<Grid.Column
			id="Chat-Component"
			style={{ height: '100vh', padding: 0, margin: 0 }}>
			<Grid.Row id="TopBar">top bar</Grid.Row>
			<Grid.Row id="MessageField">Message Field</Grid.Row>
			<Grid divided="vertically" id="ChatField">
				<Grid.Row columns={3}>
					<Grid.Column>
						<img src={Image} />
					</Grid.Column>
					<Grid.Column>
						<form>
							<input type="text" name="message" />
						</form>
					</Grid.Column>
					<Grid.Column>test</Grid.Column>
				</Grid.Row>
			</Grid>
		</Grid.Column>
	);
}
