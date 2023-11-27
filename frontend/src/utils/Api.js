import { apiSetup } from './apiSetup.js';

class Api {
	constructor(apiSetup) {
		this._baseUrl = apiSetup.baseUrl;
	}

	_getResponseData(res) {
		if (!res.ok) {
			return Promise.reject(`Ошибка: ${res.status}`);
		}
		return res.json();
	}

	getInitialCards() {
		const token = localStorage.getItem('jwt');
		return fetch(`${this._baseUrl}/cards`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
			}
		})
			.then(res => this._getResponseData(res))
	}

	getUserInfo() {
		const token = localStorage.getItem('jwt');
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'GET',
			headers: {
				authorization: `Bearer ${token}`,
			}
		})
			.then(res => this._getResponseData(res))
	}

	loadAvatar(value) {
		const token = localStorage.getItem('jwt');
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				avatar: value.link,
			})
		},)
			.then(res => this._getResponseData(res))
	}

	loadProfile(value) {
		const token = localStorage.getItem('jwt');
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: value.name,
				about: value.about
			})
		},)
			.then(res => this._getResponseData(res))
	}

	createCard(value) {
		const token = localStorage.getItem('jwt');
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: value.name,
				link: value.link
			})
		},)
			.then(res => this._getResponseData(res))
	}

	deleteCard(card_id) {
		const token = localStorage.getItem('jwt');
		return fetch(`${this._baseUrl}/cards/${card_id}`, {
			method: 'DELETE',
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		},)
			.then(res => this._getResponseData(res))
	}

	addLike(card_id, isLiked) {
		const token = localStorage.getItem('jwt');
		return fetch(`${this._baseUrl}/cards/${card_id}/likes`, {
			method: isLiked ? 'DELETE' : 'PUT',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			}
		})
			.then(res => this._getResponseData(res))
	}


	register({ password, email }) {
		return fetch(`${this._baseUrl}/signup`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ password, email })
		})
			.then(res => this._getResponseData(res))
	};

	login({ email, password }) {
		return fetch(`${this._baseUrl}/signin`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		})
			.then(res => this._getResponseData(res))
	};
}

export const api = new Api(apiSetup);