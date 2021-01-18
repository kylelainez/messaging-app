import React from 'react';

export default function ({ message }) {
	const { text, uid } = message;
	return <div>{text}</div>;
}
