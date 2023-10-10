import Cookies from 'js-cookie';

export const config = {
	server: {
		baseUrl: 'http://localhost',
		port: 1515,
		prefix: 'api',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'same-origin',
	},
};

export const fetchApi = async (path: string, init?: RequestInit) => {
	const { baseUrl, port, prefix } = config.server;
	const token = Cookies.get('token');

	return fetch(`${baseUrl}:${port}/${prefix}/${path}`, {
		...init,
		headers: {
			...config.server.headers,
			...init?.headers,
			...(token && { Authorization: `Bearer ${token}` }),
		},
	}).then((res) => res.json());
};
