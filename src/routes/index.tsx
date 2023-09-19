import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage, LoginForm } from '@/features';
import { PrimaryLayout } from '@/layouts';
import { checkAuthLoader } from '@/helpers';

const router = createBrowserRouter([
	{
		path: '/',
		Component: PrimaryLayout,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/auth',
				children: [
					{
						index: true,
						path: 'login',
						element: <LoginForm />,
					},
					{
						path: 'register',
						async lazy() {
							return { Component: <>Register Page</> };
						},
					},
					{
						path: 'logout',
						loader: checkAuthLoader,
						element: <>Logout Page</>,
					},
				],
			},
		],
	},
]);

export default router;
