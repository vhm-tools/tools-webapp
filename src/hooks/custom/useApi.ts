import { useEffect, useState } from 'react';
import { HttpRequest, IHttpRequest } from '@/apis/http';

export const useApi = () => {
	const [http, setHttp] = useState<IHttpRequest>();

	useEffect(() => {
		setHttp(new HttpRequest());
	}, []);

	return { http };
};
