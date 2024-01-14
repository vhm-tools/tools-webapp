import { redirect } from 'react-router-dom';
import { HttpRequest } from '@/apis/http';
import { HttpMethod, HttpStatusCode } from '@/constants/api';
import { IHttpResponse } from '@/types/http';

export const checkNonAuthLoader = async () => {
  const http = new HttpRequest();
  const response = await http.fetch('auth/check', {
    method: HttpMethod.GET,
  });
  const { statusCode } = response as IHttpResponse;

  if (statusCode === HttpStatusCode.UNAUTHORIZED) {
    return null;
  }

  return redirect('/admin');
};
