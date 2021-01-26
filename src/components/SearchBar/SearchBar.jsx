import React from 'react';
import './SearchBar.css';
import { Grid } from 'semantic-ui-react';
import search from './../../images/search-24px.svg';

export default function SearchBar({ searchState, handleSearch, searchValue, user }) {
	return (
		<Grid style={{ padding: 0, margin: 0 }} className="SearchBar">
			<Grid.Column style={{ padding: '1rem' }} className="profilePictureHolder">
				<img src={user.photoUrl} alt="profile" className="profilePicture" />
			</Grid.Column>
			{searchState ? (
				<Grid.Column>
					<input
						type="text"
						value={searchValue}
						onChange={handleSearch}
						name="filter"
					/>
				</Grid.Column>
			) : (
				<Grid.Column className="name">
					{`${user.firstName} ${user.lastName}`}
				</Grid.Column>
				
			)}
			<Grid.Column style={{ padding: '1rem 2rem' }}>
				{searchState ? <img src={search} alt="search" /> : ''}
			</Grid.Column>
		</Grid>
	);
}
