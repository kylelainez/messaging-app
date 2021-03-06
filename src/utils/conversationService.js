import userService from './userService';
import tokenService from './tokenService';
const BASE_URL = '/api/conversations/';

function getConversation(conversationId) {
	return fetch(BASE_URL + conversationId, {
		headers: { 'Content-Type': 'application/json' },
		header: {
			Authorization: 'Bearer ' + tokenService.getToken()
		}
	}).then((res) => res.json());
}

function createConversation(userId) {
	return fetch(BASE_URL, {
		method: 'POST',
		body: JSON.stringify({
			currentUser: userService.getUserId(),
			targetUser: userId
		}),
		headers: { 'Content-Type': 'application/json' },
		header: {
			Authorization: 'Bearer ' + tokenService.getToken()
		}
	}).then((res) => res.json());
}

export default {
	getConversation,
	createConversation
};
