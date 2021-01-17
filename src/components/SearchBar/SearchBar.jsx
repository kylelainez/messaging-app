import React from 'react';
import './SearchBar.css';
import { Grid, Segment } from 'semantic-ui-react';
import profile from './account_circle-24px.svg';
import search from './search-24px.svg';

export default function SearchBar() {
	return (
		<Grid style={{ padding: 0, margin: 0 }} className="SearchBar">
			<Grid.Column>
				<img src={profile} />
			</Grid.Column>
			<Grid.Column>
				<img src={search} />
			</Grid.Column>
		</Grid>
	);
}
