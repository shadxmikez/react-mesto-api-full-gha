export const setToken = (token) => {
	localStorage.setItem(TOKEN_KEY, token.token)
}

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const removeToken = () => {
	localStorage.removeItem(TOKEN_KEY);
}

const TOKEN_KEY = 'jwt';