import React, { useState } from 'react';
import './MessagePage.css';
import LeftSideComponent from '../../components/LeftSideComponent/LeftSideComponent';
import ChatComponent from './../../components/ChatComponent/ChatComponent';
import { Grid } from 'semantic-ui-react';
import conversationService from '../../utils/conversationService';

import io from 'socket.io-client';
const socket = io();

export default function ({ user, handleUser }) {
	const [state, setState] = useState({
		conversation: ''
	});

	async function handleContactClick(userId) {
		const conversation = await conversationService.createConversation(
			userId
		);
		setState({
			conversation: { ...conversation.conversation }
		});
	}

	async function handleConversation(conversationId) {
		const conversation = await conversationService.getConversation(
			conversationId
		);
		setState({
			conversation: { ...conversation.conversation }
		});
	}

	socket.on('connect', () => {
		socket.on('chat message', (msg) => {
			console.log('client receives this', msg);
			if (socket.connected) {
				console.log(socket.id);
			}
		});
	});

	return (
		<Grid
			divided="vertically"
			style={{ height: '100vh', padding: 0, margin: 0 }}>
			<Grid.Row style={{ padding: 0, margin: 0 }} columns={2}>
				<LeftSideComponent
					handleContactClick={handleContactClick}
					handleConversation={handleConversation}
					user={user}
					handleUser={handleUser}
				/>
				<ChatComponent user={user} conversation={state} />
			</Grid.Row>
		</Grid>
	);
}
