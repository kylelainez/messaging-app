import React from 'react';
import { Grid } from 'semantic-ui-react';
import './BigLogo.css';
export default function (props) {
	return (
		<Grid.Column
			className="BigLogo"
			width={8}
			style={{ padding: 0, margin: 0 }}>
			<div className="BigLogo-content">
				Join now and talk with your friends!
			</div>
		</Grid.Column>
	);
}
