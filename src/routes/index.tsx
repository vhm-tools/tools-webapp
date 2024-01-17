import { Navigate, createBrowserRouter } from 'react-router-dom';
import { checkAuthLoader, checkNonAuthLoader } from '@/helpers';
import { AuthLayout, AdminLayout } from '@/layouts';

/*
 * Assets
 */
import { MdHome } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';
import { LuWorkflow } from 'react-icons/lu';

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
            props: {
              name: 'List templates',
              path: 'template/list',
            },
            async lazy() {
              const { ListTemplatePage } = await import('@/pages/template');
              return {
                Component: ListTemplatePage,
              };
            },
          },
        ],
        props: {
          name: 'Template',
          icon: <MdHome className="h-6 w-6" />,
        },
      },
      {
        path: 'workflow',
        props: {
          name: 'Workflow',
          icon: <LuWorkflow className="h-5 w-5" />,
        },
      },
      {
        path: 'user',
        props: {
          name: 'User',
          icon: <FaUser className="h-5 w-5" />,
        },
      },
      {
        path: 'setting',
        props: {
          name: 'Settings',
          icon: <IoSettings className="h-5 w-5" />,
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
