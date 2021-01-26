import React, { useState, useEffect } from 'react';
import './MessagePage.css';
import LeftSideComponent from '../../components/LeftSideComponent/LeftSideComponent';
import ChatComponent from './../../components/ChatComponent/ChatComponent';
import { Grid } from 'semantic-ui-react';
import conversationService from '../../utils/conversationService';
import userService from '../../utils/userService';

import {socket} from './socket';
import messageService from '../../utils/messageService';


export default function ({ handleUser }) {
	const [state, setState] = useState({
		conversation: '',
		activeUsers: [],
		messages:{},
		user: ''
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
		
		await setState({ ...state, user: getuser.user, messages: messages });
		// initializeSocket(getuser.user)
	}

	async function handleContactClick(userId) {
		const conversation = await conversationService.createConversation(
			userId
		);
		if(state.messages[conversation.conversation._id] === undefined){
			setState({
				...state,
				conversation: { ...conversation.conversation },
				messages: {
					...state.messages,
					[conversation.conversation._id]: {
						messages: []
					}
				}
			});
		}else{
			setState({
				...state,
				conversation: { ...conversation.conversation }
			});
		}
			
	}


	function initializeSocket(){
		if(state.user !== ''){
			socket.emit('logged in',state.user);
			socket.on('logged in', (data)=> {
				console.log('new User')
				const activeUsers = state.activeUsers;
				activeUsers.push(data);
				setState({
					...state,
					activeUsers: activeUsers
				})
			})
			socket.on('message', (data) => {
				addNewMessage(data);
			})
		}
		
	}
	function addNewMessage(data){
		const conversation = state.messages[data.conversation._id] 
							? state.messages[data.conversation._id]
							: {
								messages: []
							};
		conversation.messages.push(data);
		console.log(state)
		let userContainsConversation = false;
		console.log(state.user)
		for(let conv of state.user.conversationList){
			console.log(conv._id, 'here')
			if(conv._id === data.conversation._id){
				userContainsConversation = true;
			}
		}
		if(!userContainsConversation){
			const convList = state.user.conversationList;
			convList.push(data.conversation);
			setState({
				...state,
				user: {
					...state.user,
					conversationList: convList
				}
			})
		}
		setState({
			...state,
			messages: {
				...state.messages,
				[data.conversation._id]: conversation
			}
		})
	}

	useEffect(() => {
		initializeSocket()
		return function cleanUp(){
			socket.off('message')
		}
	},[state.user, state.conversation])

	function handleEmit(message){
		message.conversation = state.conversation;
		socket.emit('message', message);
		// console.log(socket)
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
						handleEmit={handleEmit}
					/>
				</Grid.Row>
			)}
		</Grid>
	);
}
