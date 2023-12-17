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
  ): Promise<IHttpResponse<T> | Response> {
    const { baseUrl, version, headers } = this.config.server;
    const token = Cookies.get('token');

    const url = config.addVersion
      ? `${baseUrl}/${version}/${path}`
      : `${baseUrl}/${path}`;

    const res = await fetch(url, {
      credentials: this.config.credentials,
      ...init,
      headers: {
        ...headers,
        ...init?.headers,
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
    });

    const responseType = res.headers.get('content-type') || '';
    if (responseType.includes('application/json')) {
      const resJson: IHttpResponse<T> = await res.json();
      return resJson;
    }
    return res;
  }
}
