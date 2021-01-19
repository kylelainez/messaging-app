import React, { useState } from 'react';
import './MessagePage.css';
import LeftSideComponent from '../../components/LeftSideComponent/LeftSideComponent';
import ChatComponent from './../../components/ChatComponent/ChatComponent';
import { Grid } from 'semantic-ui-react';
import conversationService from '../../utils/conversationService';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function ({ user }) {
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
	const query = messagesRef.orderBy('createdAt').limitToLast(25);
	const [messages] = useCollectionData(query, { idField: 'id' });

	/* Firebase End */

	const [conversation, setConversation] = useState({
		conversation: ''
	});

	function handleConversation(userId) {
		const conversation = conversationService.createConversation(userId);
		setConversation({
			conversation: ''
		});
	}

	return (
		<Grid
			divided="vertically"
			style={{ height: '100vh', padding: 0, margin: 0 }}>
			<Grid.Row style={{ padding: 0, margin: 0 }} columns={2}>
				<LeftSideComponent
					handleConversation={handleConversation}
					user={user}
				/>
				<ChatComponent
					messages={messages}
					messagesRef={messagesRef}
					firebase={firebase}
					user={user}
				/>
			</Grid.Row>
		</Grid>
	);
}
