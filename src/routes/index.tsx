import { Navigate, createBrowserRouter } from 'react-router-dom';
import { checkAuthLoader, checkNonAuthLoader } from '@/helpers';
import { AuthLayout, AdminLayout } from '@/layouts';
import { MdHome } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';

/**
 * Pages
 */
import { ErrorDefaultPage } from '@/pages/error';
import { LoginPage } from '@/pages/auth';

export enum ERoute {
  AUTH = 'auth',
  ADMIN = 'admin',
  DEFAULT = 'default',
}

export const routes = {
  [ERoute.AUTH]: {
    path: 'auth',
    Component: AuthLayout,
    loader: checkNonAuthLoader,
    children: [
      {
        index: true,
        path: 'login',
        element: <LoginPage />,
      },
    ],
    // End routes of /auth/
  },
  [ERoute.ADMIN]: {
    path: 'admin',
    Component: AdminLayout,
    loader: checkAuthLoader,
    children: [
      {
        path: 'template',
        children: [
          {
            index: true,
            path: 'create',
            props: {
              name: 'Create new',
              path: 'template/create',
            },
            async lazy() {
              const { CreateTemplatePage } = await import('@/pages/template');
              return {
                Component: CreateTemplatePage,
              };
            },
          },
          {
            path: 'list',
            element: <></>,
            props: {
              name: 'List templates',
              path: 'template/list',
            },
          },
        ],
        props: {
          name: 'Template',
          icon: <MdHome className="h-6 w-6" />,
        },
      },
      {
        path: 'user',
        props: {
          name: 'User',
          icon: <FaUser className="h-5 w-5" />,
        },
      },
      // End routes of /admin/
    ],
  },
  [ERoute.DEFAULT]: {
    index: true,
    element: <Navigate to="/auth/login" replace />,
  },
};

export default function createRouters() {
  return createBrowserRouter([
    {
      path: '/',
      errorElement: <ErrorDefaultPage />,
      children: Object.values(routes),
    },
  ]);
}
