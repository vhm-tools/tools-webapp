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
  data: T | T[];
  metadata?: any;
  message: string;
}
