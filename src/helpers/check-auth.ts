import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { HttpRequest } from '@/apis/http';
import { IHttpResponse } from '@/types/http';
import { HttpMethod, HttpStatusCode } from '@/constants/api';

export const checkAuthLoader = async ({ request }: LoaderFunctionArgs) => {
  const http = new HttpRequest();
  const response = await http.fetch('auth/check', {
    method: HttpMethod.GET,
  });

  const { statusCode } = response as IHttpResponse;

  if (statusCode === HttpStatusCode.OK) {
    return null;
  }

  const url = new URL(request.url);
  const params = new URLSearchParams();
  params.set('from', url.pathname);

  return redirect(`/auth/login?${params.toString()}`);
};
