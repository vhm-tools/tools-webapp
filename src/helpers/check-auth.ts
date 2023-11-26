import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { HttpRequest } from '@/apis/http';

export const checkAuthLoader = async ({ request }: LoaderFunctionArgs) => {
  const http = new HttpRequest();
  const { statusCode } = await http.fetch(
    'auth/check',
    {
      method: 'GET',
    },
    { addVersion: false },
  );

  if (statusCode === 200) {
    return null;
  }

  const url = new URL(request.url);
  const params = new URLSearchParams();
  params.set('from', url.pathname);

  return redirect(`/auth/login?${params.toString()}`);
};
