import React from 'react';
import './MessagePage.css';
import LeftSideComponent from '../../components/LeftSideComponent/LeftSideComponent';
import ChatComponent from './../../components/ChatComponent/ChatComponent';
import { Grid } from 'semantic-ui-react';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function ({ user }) {
	if (!firebase.apps.length) {
		firebase.initializeApp({
			apiKey: 'AIzaSyAtcKqWBUIoVXWVO6naHAF1y8EFwTTBjJg',
			authDomain: 'chat-app-90905.firebaseapp.com',
			projectId: 'chat-app-90905',
			storageBucket: 'chat-app-90905.appspot.com',
			messagingSenderId: '100126804543',
			appId: '1:100126804543:web:8f7b9fd4b50753b1d2c68a',
			measurementId: 'G-55R9HMJKYS'
		});
	} else {
		firebase.app();
	}

	const firestore = firebase.firestore();
	const messagesRef = firestore.collection('messages');
	const query = messagesRef.orderBy('createdAt').limitToLast(25);

	const [messages] = useCollectionData(query, { idField: 'id' });

	return (
		<Grid
			divided="vertically"
			style={{ height: '100vh', padding: 0, margin: 0 }}>
			<Grid.Row style={{ padding: 0, margin: 0 }} columns={2}>
				<LeftSideComponent />
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
