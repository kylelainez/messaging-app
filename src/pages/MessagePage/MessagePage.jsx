import React, { useState, useEffect } from 'react';
import './MessagePage.css';
import LeftSideComponent from '../../components/LeftSideComponent/LeftSideComponent';
import ChatComponent from './../../components/ChatComponent/ChatComponent';
import { Grid } from 'semantic-ui-react';
import conversationService from '../../utils/conversationService';
import userService from '../../utils/userService';

import io from 'socket.io-client';
import messageService from '../../utils/messageService';


export default function ({ handleUser }) {
	const [state, setState] = useState({
		conversation: '',
		user: '',
		messages: {}
	});
	const [loading, setLoading] = useState(true);

	async function getData() {
		const getuser = await userService.getUser();
		const messages = {};
		for (let conversation of getuser.user.conversationList) {
			messages[
				conversation._id
			] = await messageService.getConversationMessages(conversation._id);
		}
		initializeSocket(getuser.user);
		setState({ ...state, user: getuser.user, messages: messages });
	}

	async function handleContactClick(userId) {
		const conversation = await conversationService.createConversation(
			userId
		);
		const messages = {
			[conversation.newConversation._id]: {
				messages: []
			}
		}
		
		await setState({
			...state,
			conversation: { ...conversation.newConversation },
			messages: messages
		});
	}


	function initializeSocket(user){
		const socket = io()
		socket.emit('new user', user);
		socket.on('new user', (data)=> {
			console.log('new user has logged in' , data)
		})
		socket.on('directed message', (data) => {
			console.log(data)
		})
	}


	async function handleConversation(conversation) {
		setState({
			...state,
			conversation: conversation
		});
	}
	useEffect(() => {
		let mounted = true;
		async function get() {
			await getData();
			if (mounted) {
				setLoading(false);
			}
		}
		get();
		
		return function cleanUp() {
			mounted = false;
		};
	}, []);
	return (
		<Grid
			divided="vertically"
			style={{ height: '100vh', padding: 0, margin: 0 }}>
			{loading ? (
				''
			) : (
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
			)}
		</Grid>
	);
}
