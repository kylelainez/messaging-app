import React from 'react';
import './LeftSideComponent.css';
import SearchBar from '../SearchBar/SearchBar';
import BottomNav from '../BottomNav/BottomNav';
import ConversationList from '../../components/ConversationList/ConversationList';
import { Grid } from 'semantic-ui-react';

export default function LeftSideComponent() {
	return (
		<Grid className="LeftSideComponent">
			<Grid.Row>
				<SearchBar />
			</Grid.Row>
			<Grid.Row>
				<ConversationList />
			</Grid.Row>
			<Grid.Row>
				<BottomNav />
			</Grid.Row>
		</Grid>
	);
}
