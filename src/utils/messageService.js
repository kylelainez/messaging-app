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
		body: message,
		header: {
			Authorization: 'Bearer ' + tokenService.getToken()
		}
	}).then((res) => res.json());
}
function getConversationMessages(conversationId) {
	fetch(BASE_URL + conversationId, {
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
