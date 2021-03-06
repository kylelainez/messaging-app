import React, { useState } from 'react';
import './LeftSideComponent.css';
import SearchBar from '../SearchBar/SearchBar';
import BottomNav from '../BottomNav/BottomNav';
import ConversationList from '../../components/ConversationList/ConversationList';
import ContactList from '../../components/ContactList/ContactList';
import Settings from '../../components/Settings/Settings';
import { Grid } from 'semantic-ui-react';


export default function LeftSideComponent({
	handleContactClick,
	handleConversation,
	user,
	handleUser
}) {
	const [state, setState] = useState({
		menu: 'messages',
		searchDisplay: false,
		search: ''
	});

	function handleSelected(name) {
		setState({
			...state,
			menu: name,
			searchDisplay: name === 'contacts' ? true : false
		});
	}

	function handleSearch(e) {
		e.preventDefault();
		setState({
			...state,
			search: e.target.value
		});
	}
	return (
		<Grid.Column id="LeftSideComponent">
			<SearchBar
				searchState={state.searchDisplay}
				handleSearch={handleSearch}
				searchValue={state.search}
				user={user}
			/>
			<Grid.Row className="scroll-auto">
				{state.menu === 'contacts' ? (
					<ContactList
						handleContactClick={handleContactClick}
						handleSelected={handleSelected}
						searchValue={state}
					/>
				) : state.menu === 'settings' ? (
					<Settings handleUser={handleUser} />
				) : (
					<ConversationList
						handleConversation={handleConversation}
						user={user}
					/>
				)}
			</Grid.Row>
			<Grid.Row>
				<BottomNav handleSelected={handleSelected} />
			</Grid.Row>
		</Grid.Column>
	);
}
