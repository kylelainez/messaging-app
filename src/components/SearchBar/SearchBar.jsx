import React from 'react';
import './SearchBar.css';
import { Grid } from 'semantic-ui-react';
import profile from './../../images/account_circle-24px.svg';
import search from './../../images/search-24px.svg';

export default function SearchBar() {
	return (
		<Grid style={{ padding: 0, margin: 0 }} className="SearchBar">
			<Grid.Column style={{ padding: '1rem' }}>
				<img src={profile} />
			</Grid.Column>
			<Grid.Column style={{ padding: '1rem 2rem' }}>
				<img src={search} />
			</Grid.Column>
		</Grid>
	);
}
