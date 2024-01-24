import { IHttpResponse } from '@/types/http';
import { IListWorkflow, IListWorkflowParams } from '@/types/workflow';
import { convertObjectToQuery } from '@/utils';
import { HttpMethod, HttpStatusCode } from '@/constants/api';
import { HttpRequest, defaultConfig } from '../http';

export class WorkflowRepository {
  private http: HttpRequest;
  private readonly apiVersion: string;
  private readonly apiPrefix: string;

  constructor() {
    this.http = new HttpRequest();
    this.apiVersion = defaultConfig.server.version;
    this.apiPrefix = `${this.apiVersion}/workflows`;
  }

  async getList(params: IListWorkflowParams): Promise<IListWorkflow> {
    const response = await this.http.fetch(
      `${this.apiPrefix}?${convertObjectToQuery(params.query)}`,
      {
        method: HttpMethod.GET,
      },
    );
    const { data, statusCode, message } =
      response as IHttpResponse<IListWorkflow>;

    if (statusCode !== HttpStatusCode.OK) {
      throw new Error(message);
    }

    return data;
  }
}
