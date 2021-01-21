import React, { useState } from 'react';
import './BottomNav.css';
import { Menu, Icon } from 'semantic-ui-react';
import Contacts from './../../images/account_circle-24px.svg';
import Messages from './../../images/chat-24px.svg';
import Settings from './../../images/settings-24px.svg';

export default function ({ handleSelected }) {
	const [activeItem, setActiveItem] = useState('messages');
	function handleClick(e, { name }) {
		setActiveItem(name);
		handleSelected(name);
	}
	return (
		<Menu fluid widths={3} borderless icon="labeled" className="Bottom-Nav">
			<Menu.Item
				name="contacts"
				active={activeItem === 'contacts'}
				onClick={handleClick}>
				<img src={Contacts} alt="contacts" name="contacts" />
			</Menu.Item>
			<Menu.Item
				name="messages"
				active={activeItem === 'messages'}
				onClick={handleClick}>
				<img src={Messages} alt="messages" name="messages" />
			</Menu.Item>
			<Menu.Item
				name="settings"
				active={activeItem === 'settings'}
				onClick={handleClick}>
				<img src={Settings} alt="settings" name="settings" />
			</Menu.Item>
		</Menu>
	);
}
