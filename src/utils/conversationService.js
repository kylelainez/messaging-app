import userService from './userService';
import tokenService from './tokenService';
const BASE_URL = '/api/conversations';

function getConversation(userId) {
	return fetch(BASE_URL + userId, {
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
			currentUser: userService.getUser()._id,
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
