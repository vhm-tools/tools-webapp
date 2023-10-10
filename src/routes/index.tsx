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
						async lazy() {
							return { Component: LoginForm };
						},
					},
					{
						path: 'logout',
						loader: checkAuthLoader,
						element: <>Logout Page</>,
					},
				],
			},
			{
				path: 'mail',
        // loader: checkAuthLoader,
        children: [
					{
						path: 'builder',
            async lazy() {
              const { MailBuilder } = await import('@/features');
							return { Component: MailBuilder };
						},
					},
        ]
			},
		],
	},
]);

export default router;
