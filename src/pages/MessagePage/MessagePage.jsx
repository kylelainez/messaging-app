import React, { useState, useEffect } from 'react';
import './MessagePage.css';
import LeftSideComponent from '../../components/LeftSideComponent/LeftSideComponent';
import ChatComponent from './../../components/ChatComponent/ChatComponent';
import { Grid } from 'semantic-ui-react';
import conversationService from '../../utils/conversationService';
import userService from '../../utils/userService';

import io from 'socket.io-client';
import messageService from '../../utils/messageService';
const socket = io();

export default function ({ handleUser }) {
	const [state, setState] = useState({
		conversation: '',
		user: '',
		messages: {}
	});

	async function getData() {
		const getuser = await userService.getUser();
		const messages = {};
		for (let conversation of getuser.user.conversationList) {
			messages[
				conversation._id
			] = await messageService.getConversationMessages(conversation._id);
		}
		console.log(messages);
		setState({ ...state, user: getuser.user, messages: messages });
	}

	async function handleContactClick(userId) {
		const conversation = await conversationService.createConversation(
			userId
		);
		setState({
			...state,
			conversation: { ...conversation.conversation }
		});
	}

	async function handleConversation(conversation) {
		setState({
			...state,
			conversation: conversation
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

	useEffect(() => {
		getData();
	}, []);
	return (
		<Grid
			divided="vertically"
			style={{ height: '100vh', padding: 0, margin: 0 }}>
			<Grid.Row style={{ padding: 0, margin: 0 }} columns={2}>
				<LeftSideComponent
					handleContactClick={handleContactClick}
					handleConversation={handleConversation}
					user={state.user}
					handleUser={handleUser}
				/>
				<ChatComponent
					user={state.user}
					conversation={state.conversation}
					messages={state.messages}
				/>
			</Grid.Row>
		</Grid>
	);
}
