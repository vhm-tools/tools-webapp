import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

export const checkAuthLoader = ({ request }: LoaderFunctionArgs) => {
	const token = Cookies.get('token');

	if (token) {
		return null;
	}

	const params = new URLSearchParams();
	params.set('from', new URL(request.url).pathname);

	return redirect(`/auth/login?${params.toString()}`);
};
