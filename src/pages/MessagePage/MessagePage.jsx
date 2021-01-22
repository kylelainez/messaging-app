import React, { useState } from 'react';
import './MessagePage.css';
import LeftSideComponent from '../../components/LeftSideComponent/LeftSideComponent';
import ChatComponent from './../../components/ChatComponent/ChatComponent';
import { Grid } from 'semantic-ui-react';
import conversationService from '../../utils/conversationService';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import io from 'socket.io-client';
const socket = io();

export default function ({ user, handleUser }) {
	const [state, setState] = useState({
		conversation: ''
	});

	/* Firebase  */
	if (!firebase.apps.length) {
		firebase.initializeApp({
			apiKey: process.env.REACT_APP_apiKey,
			authDomain: process.env.REACT_APP_authDomain,
			projectId: process.env.REACT_APP_projectId,
			storageBucket: process.env.REACT_APP_storageBucket,
			messagingSenderId: process.env.REACT_APP_messagingSenderId,
			appId: process.env.REACT_APP_appId,
			measurementId: process.env.REACT_APP_measurementId
		});
	} else {
		firebase.app();
	}
	const firestore = firebase.firestore();
	const messagesRef = firestore.collection('messages');
	const query = messagesRef.orderBy('createdAt');
	const [messages] = useCollectionData(query, { idField: 'id' });
	/* Firebase End */

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
				<ChatComponent
					messages={messages}
					messagesRef={messagesRef}
					firebase={firebase}
					user={user}
					conversation={state}
				/>
			</Grid.Row>
		</Grid>
	);
}
