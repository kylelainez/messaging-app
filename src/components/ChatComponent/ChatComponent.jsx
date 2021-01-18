import React, { useState } from 'react';
import './ChatComponent.css';
import { Grid } from 'semantic-ui-react';
import MessageBubble from './../MessageBubble/MessageBubble';
import Image from '../../images/insert_photo-24px.svg';
import Send from '../../images/send-24px.svg';

export default function ({ messages, messagesRef, firebase, user }) {
	const [state, setState] = useState({ message: '' });

	function handleInput(e) {
		setState({ message: e.target.value });
	}
	async function onSubmit(e) {
		e.preventDefault();

		await messagesRef.add({
			text: state.message,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			sender: user._id
		});
		setState({ message: '' });
	}
	return (
		<Grid.Column
			id="Chat-Component"
			style={{ height: '100vh', padding: 0, margin: 0 }}>
			<Grid.Row id="TopBar">top bar</Grid.Row>
			<Grid.Row id="MessageField">
				Message Field
				<div>
					{messages &&
						messages.map((msg, idx) => (
							<MessageBubble message={msg} key={idx} />
						))}
				</div>
			</Grid.Row>
			<Grid divided="vertically" id="ChatField">
				<Grid.Row style={{ padding: 0, margin: 0 }} width="100%">
					<Grid.Column
						style={{ padding: 0, margin: 0 }}
						className="ChatFieldItem"
						verticalAlign="middle"
						textAlign="left"
						width={1}>
						<img src={Image} height="35px" alt="gallery" />
					</Grid.Column>
					<Grid.Column
						style={{ padding: 0, margin: 0 }}
						className="ChatFieldItem"
						verticalAlign="middle"
						width={15}>
						<form
							name="messageForm"
							autoComplete="off"
							onSubmit={onSubmit}>
							<input
								type="text"
								name="message"
								onChange={handleInput}
								value={state.message}
							/>
							<input type="image" src={Send} alt="send" />
						</form>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Grid.Column>
	);
}