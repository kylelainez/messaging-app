import React from 'react';
import './SearchBar.css';
import { Grid } from 'semantic-ui-react';
import profile from './../../images/account_circle-24px.svg';
import search from './../../images/search-24px.svg';

export default function SearchBar({ searchState, handleSearch, searchValue }) {
	return (
		<Grid style={{ padding: 0, margin: 0 }} className="SearchBar">
			<Grid.Column style={{ padding: '1rem' }}>
				<img src={profile} alt="profile" />
			</Grid.Column>
			{searchState ? (
				<Grid.Column>
					<input
						type="text"
						value={searchValue}
						onChange={handleSearch}
					/>
				</Grid.Column>
			) : (
				''
			)}
			<Grid.Column style={{ padding: '1rem 2rem' }}>
				<img src={search} alt="search" />
			</Grid.Column>
		</Grid>
	);
}
