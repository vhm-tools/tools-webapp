import {
  IExtraConfig,
  IHttpRequestConfig,
  IHttpRequest,
  IHttpResponse,
} from '@/types';
import Cookies from 'js-cookie';

export class HttpRequest implements IHttpRequest {
  config: IHttpRequestConfig;

  constructor() {
    this.config = {
      server: {
        baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:1515/api',
        version: import.meta.env.VITE_API_VERSION || 'v1',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      credentials: 'include', // same-origin
    };
  }

  async fetch<T>(
    path: string,
    init?: RequestInit,
    config: IExtraConfig = { addVersion: true },
  ): Promise<IHttpResponse<T>> {
    const { baseUrl, version, headers } = this.config.server;
    const token = Cookies.get('token');

    const url = config.addVersion
      ? `${baseUrl}/${version}/${path}`
      : `${baseUrl}/${path}`;

    return fetch(url, {
      credentials: this.config.credentials as RequestCredentials,
      ...init,
      headers: {
        ...headers,
        ...init?.headers,
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
    }).then((res) => {
      const responseType = res.headers.get('content-type') || '';
      if (responseType.includes('application/json')) {
        return res.json();
      }
      return res;
    });
  }
}
