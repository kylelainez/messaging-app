import React from 'react';
import './BottomNav.css';
import { Menu, Icon } from 'semantic-ui-react';
import Contacts from './../../images/account_circle-24px.svg';
import Messages from './../../images/chat-24px.svg';
import Settings from './../../images/settings-24px.svg';

export default function () {
	return (
		<Menu fluid widths={3} borderless icon="labeled" className="Bottom-Nav">
			<Menu.Item>
				<img src={Contacts} alt="contacts" />
				Contacts
			</Menu.Item>
			<Menu.Item>
				<img src={Messages} alt="messages" />
				Messages
			</Menu.Item>
			<Menu.Item>
				<img src={Settings} alt="settings" />
				Settings
			</Menu.Item>
		</Menu>
	);
}
