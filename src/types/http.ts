export interface IHttpRequestConfig {
  server: {
    baseUrl: string;
    version: string;
    headers: Record<string, any>;
  };
  credentials: RequestCredentials;
}

export interface IExtraConfig {
  addVersion: boolean;
}

export interface IHttpRequest {
  config: IHttpRequestConfig;
  fetch: (
    _path: string,
    _init?: RequestInit,
  ) => Promise<Response | IHttpResponse>;
}

export interface IHttpResponse<T = any> {
  statusCode: number;
  code: string;
  data: T;
  metadata?: any;
  message: string;
}

export interface IQueryRequest<Q> {
  headers?: Record<string, any>;
  query: Q;
}
