import tokenService from './tokenService';
const BASE_URL = '/api/message/';

function uploadPhoto(object) {
	fetch(BASE_URL + 'photo', {
		method: 'POST',
		body: object,
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

export default {
	uploadPhoto,
	uploadMessage
};
