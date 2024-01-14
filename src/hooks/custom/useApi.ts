import { useEffect, useState } from 'react';
import { HttpRequest } from '@/apis/http';
import { IHttpRequest } from '@/types/http';

export const useApi = () => {
  const [http, setHttp] = useState<IHttpRequest>();

  useEffect(() => {
    setHttp(new HttpRequest());
  }, []);

  return { http };
};
