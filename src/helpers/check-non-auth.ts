import { redirect } from 'react-router-dom';
import { HttpRequest } from '@/apis/http';

export const checkNonAuthLoader = async () => {
  const http = new HttpRequest();
  const { statusCode } = await http.fetch(
    'auth/check',
    {
      method: 'GET',
    },
    { addVersion: false },
  );

  if (statusCode === 401) {
    return null;
  }

  return redirect('/admin');
};
