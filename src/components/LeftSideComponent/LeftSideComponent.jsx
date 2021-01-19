import React from 'react';
import './LeftSideComponent.css';
import SearchBar from '../SearchBar/SearchBar';
import BottomNav from '../BottomNav/BottomNav';
import ConversationList from '../../components/ConversationList/ConversationList';
import { Grid } from 'semantic-ui-react';

export default function LeftSideComponent({ handleConversation, user }) {
	return (
		<Grid.Column id="LeftSideComponent">
			<SearchBar />
			<Grid.Row>
				<ConversationList
					handleConversation={handleConversation}
					user={user}
				/>
			</Grid.Row>
			<Grid.Row>
				<BottomNav />
			</Grid.Row>
		</Grid.Column>
	);
}
