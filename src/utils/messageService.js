import tokenService from './tokenService';
const BASE_URL = '/api/message/';

function uploadPhoto(message) {
	fetch(BASE_URL + 'photo', {
		method: 'POST',
		body: message,
		header: {
			Authorization: 'Bearer ' + tokenService.getToken()
		}
	}).then((res) => res.json());
}

function uploadMessage(message) {
	fetch(BASE_URL, {
		method: 'POST',
		body: JSON.stringify(message),
		headers: { 'Content-Type': 'application/json' },
		header: {
			Authorization: 'Bearer ' + tokenService.getToken()
		}
	}).then((res) => res.json());
}
async function getConversationMessages(conversationId) {
	await fetch(BASE_URL + conversationId, {
		headers: { 'Content-Type': 'application/json' },
		header: {
			Authorization: 'Bearer ' + tokenService.getToken()
		}
	}).then((res) => res.json());
}

export default {
	uploadPhoto,
	uploadMessage,
	getConversationMessages
};
