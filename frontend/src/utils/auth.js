

class Auth {
	constructor(baseUrl) {
		this._baseUrl = baseUrl;
	}

	_getResponseData(res) {
		if (!res.ok) {
			return Promise.reject(`Ошибка: ${res.status}`);
		}
		return res.json();
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

	checkToken(token) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			}
		})
			.then(res => this._getResponseData(res))
	}
}

export const auth = new Auth("https://api.shadxmikez.nomoredomainsmonster.ru");