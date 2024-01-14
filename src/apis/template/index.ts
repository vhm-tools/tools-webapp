import { IHttpResponse } from '@/types/http';
import {
  IListTemplateParams,
  IListTemplate,
  ICreateTemplate,
} from '@/types/template';
import { convertObjectToQuery } from '@/utils';
import { HttpMethod, HttpStatusCode } from '@/constants/api';
import { HttpRequest, defaultConfig } from '../http';

export class TemplateRepository {
  private http: HttpRequest;
  private readonly apiVersion: string;
  private readonly apiPrefix: string;

  constructor() {
    this.http = new HttpRequest();
    this.apiVersion = defaultConfig.server.version;
    this.apiPrefix = `${this.apiVersion}/templates`;
  }

  async createTemplate(payload: ICreateTemplate): Promise<IHttpResponse> {
    const response = await this.http.fetch(this.apiPrefix, {
      method: HttpMethod.POST,
      body: JSON.stringify(payload),
    });
    return response as IHttpResponse;
  }

  async listTemplates(params: IListTemplateParams): Promise<IListTemplate> {
    const response = await this.http.fetch(
      `${this.apiPrefix}?${convertObjectToQuery(params.query)}`,
      {
        method: HttpMethod.GET,
      },
    );
    const { data, statusCode, message } =
      response as IHttpResponse<IListTemplate>;

    if (statusCode !== HttpStatusCode.OK) {
      throw new Error(message);
    }

    return data;
  }
}
