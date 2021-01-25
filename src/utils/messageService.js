import tokenService from './tokenService';
const BASE_URL = '/api/message/';

function uploadPhoto(message) {
	return fetch(BASE_URL + 'photo', {
		method: 'POST',
		body: message,
		header: {
			Authorization: 'Bearer ' + tokenService.getToken()
		}
	}).then((res) => res.json());
}

function uploadMessage(message) {
	return fetch(BASE_URL, {
		method: 'POST',
		body: JSON.stringify(message),
		headers: { 'Content-Type': 'application/json' },
		header: {
			Authorization: 'Bearer ' + tokenService.getToken()
		}
	}).then((res) => res.json());
}
function getConversationMessages(conversationId) {
	return fetch(BASE_URL + conversationId, {
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
