import {
  IExtraConfig,
  IHttpRequestConfig,
  IHttpRequest,
  IHttpResponse,
} from '@/types/http';
import Cookies from 'js-cookie';

export const defaultConfig: IHttpRequestConfig = {
  server: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:1515/api',
    version: import.meta.env.VITE_API_VERSION || 'v1',
    headers: {
      'Content-Type': 'application/json',
    },
  },
  credentials: 'include', // same-origin
};

export class HttpRequest implements IHttpRequest {
  readonly config: IHttpRequestConfig = defaultConfig;

  async fetch<T>(
    path: string,
    init?: RequestInit,
    config?: IExtraConfig,
  ): Promise<IHttpResponse<T> | Response> {
    const { baseUrl, headers } = this.config.server;
    const token = Cookies.get('token');

    const url = `${baseUrl}/${path}`;

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
      ...config,
    });

    const responseType = res.headers.get('content-type') || '';
    if (responseType.includes('application/json')) {
      const resJson: IHttpResponse<T> = await res.json();
      return resJson;
    }
    return res;
  }
}
