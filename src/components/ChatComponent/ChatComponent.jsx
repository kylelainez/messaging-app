import React, { useState, useEffect, useRef } from 'react';
import './ChatComponent.css';
import { Grid, Modal, Button } from 'semantic-ui-react';
import MessageBubble from './../MessageBubble/MessageBubble';
import Image from '../../images/insert_photo-24px.svg';
import Send from '../../images/send-24px.svg';
import messageService from '../../utils/messageService';

export default function ({ conversation, messages, user, handleEmit, member }) {
	const [state, setState] = useState({
		message: '',
		user: {},
		imageUpload: false,
		selectedFile: ''
	});
	const bottomRef = useRef(null);

	function handleInput(e) {
		setState({ ...state, message: e.target.value });
	}

	async function onSubmit(e) {
		e.preventDefault();
		const formData = {};
		formData['message'] = state.message;
		formData['sender'] = state.user._id;
		formData['conversation'] = conversation._id;
		const newMessage = await messageService.uploadMessage(formData);
		handleEmit(newMessage.newMessage)
		setState({ ...state, message: '' });
	}

	function openImageUpload() {
		setState({
			...state,
			imageUpload: true
		});
	}
	function closeImageUpload() {
		setState({
			...state,
			imageUpload: false
		});
	}

	async function handleImageSubmit(e) {
		e.preventDefault();
		const formData = new FormData();
		formData.append('photo', state.selectedFile);
		formData.append('sender', state.user._id);
		formData.append('conversation', conversation._id);
		await messageService.uploadPhoto(formData);
		closeImageUpload();
	}
	function handleFileInput(e) {
		setState({
			...state,
			selectedFile: e.target.files[0]
		});
	}

	useEffect(() => {
		setState({
			...state,
			user: user
		});
	}, []);

	function scrollToBottom(){
		bottomRef.current.scrollIntoView({behavior: 'smooth'})
	}

	useEffect(() => {
		scrollToBottom();
	},[messages, conversation])
	return (
		<Grid.Column
			id="Chat-Component"
			style={{ height: '100vh', padding: 0, margin: 0 }}>
			<Grid.Row id="TopBar"> 
				<img src={member.photoUrl} className="profilePicture" alt=""/>
				<span>
					{member.firstName} {member.lastName}
				</span>
			</Grid.Row>
			<Grid.Row id="MessageField">
				{conversation
					? messages[conversation._id]['messages'].map((msg, idx) => (
							<MessageBubble
								message={msg}
								key={`message-${idx}`}
								user={state.user._id}
							/>
					  ))
					: ''}
					<div style={{ float:"left", clear: "both" }}
						ref={bottomRef}>
					</div>
			</Grid.Row>
			<Grid divided="vertically" id="ChatField">
				<Grid.Row style={{ padding: 0, margin: 0 }} width="100%">
					<Grid.Column
						style={{ padding: 0, margin: 0 }}
						className="ChatFieldItem"
						verticalAlign="middle"
						textAlign="left"
						width={1}>
						<Modal
							onClose={closeImageUpload}
							onOpen={openImageUpload}
							open={state.imageUpload}
							trigger={
								<img src={Image} height="35px" alt="gallery" />
							}>
							<Modal.Header>Select a Photo</Modal.Header>
							<Modal.Content>
								<form
									name="image-upload"
									onSubmit={handleImageSubmit}>
									<input
										type="file"
										name="photo"
										onChange={handleFileInput}
										accept="image/*"
										required
									/>
									<hr />
									<Button
										color="black"
										onClick={closeImageUpload}>
										Cancel
									</Button>
									<input type="submit" value="Submit" />
								</form>
							</Modal.Content>
						</Modal>
					</Grid.Column>
					<Grid.Column
						style={{ padding: 0, margin: 0 }}
						className="ChatFieldItem"
						verticalAlign="middle"
						width={15}>
						<form
							name="messageForm"
							autoComplete="off"
							onSubmit={onSubmit}>
							<input
								type="text"
								name="message"
								onChange={handleInput}
								value={state.message}
							/>
							<input type="image" src={Send} alt="send" />
						</form>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Grid.Column>
	);
}
