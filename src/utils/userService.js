import tokenService from './tokenService';

const BASE_URL = '/api/users/';

function signup(user) {
	return (
		fetch(BASE_URL + 'signup', {
			method: 'POST',
			body: user
		})
			.then(async (res) => {
				if (res.ok) return res.json();
				// Probably a duplicate email
				throw new Error('Email already taken!');
			})
			// Parameter destructuring!
			.then(({ token }) => tokenService.setToken(token))
	);
	// The above could have been written as
	//.then((token) => token.token);
}

function getUser() {
	return fetch(BASE_URL + getUserId(), {
		header: {
			Authorization: 'Bearer ' + tokenService.getToken()
		}
	}).then((res) => res.json());
}

function getUserId() {
	return tokenService.getUserFromToken()
		? tokenService.getUserFromToken()._id
		: tokenService.getUserFromToken();
}

function logout() {
	tokenService.removeToken();
}

function login(creds) {
	return fetch(BASE_URL + 'login', {
		method: 'POST',
		headers: new Headers({ 'Content-Type': 'application/json' }),
		body: JSON.stringify(creds)
	})
		.then((res) => {
			// Valid login if we have a status of 2xx (res.ok)
			if (res.ok) return res.json();
			throw new Error('Bad Credentials!');
		})
		.then(({ token }) => tokenService.setToken(token));
}
function getAllUsers() {
	return fetch(BASE_URL, {
		header: {
			Authorization: 'Bearer ' + tokenService.getToken()
		}
	}).then((res) => res.json());
}

export default {
	signup,
	getUser,
	logout,
	login,
	getAllUsers,
	getUserId
};
