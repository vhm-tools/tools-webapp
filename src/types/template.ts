import { IPagination } from './pagination';
import { IQueryRequest } from './http';

export interface ITemplate {
  _id: string;
  name: string;
  description: string;
  flows: string;
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
  flows: string;
  steps: IWorkflowStep[];
}

/**
 * Update Template
 */
export interface IUpdateTemplate {
  name?: string;
  description?: string;
  flows?: string;
}

/**
 * List Template
 */
export interface IListTemplateParams<Q = Record<string, any>>
  extends IQueryRequest<Q> {}

export interface IListTemplate extends IPagination<ITemplate> {}
