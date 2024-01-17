import { IPagination } from './pagination';
import { IQueryRequest } from './http';

export interface ITemplate {
  _id: string;
  name: string;
  description: string;
  userId: string;
}

/**
 * Create Template
 */
interface IWorkflowStep {
  id: string;
}

export interface ICreateTemplate {
  name: string;
  description: string;
  steps: IWorkflowStep[];
}

/**
 * List Template
 */
export interface IListTemplateParams<Q = Record<string, any>>
  extends IQueryRequest<Q> {}

export interface IListTemplate extends IPagination<ITemplate> {}
