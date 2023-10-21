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
	fetch: (path: string, init?: RequestInit) => Promise<any>;
}

export interface IHttpResponse<T> {
	statusCode: number;
	data: T | T[] | DataResponse<T>;
	message: string;
}

export interface DataResponse<T> {
	data: T | T[];
	metadata?: any;
}
