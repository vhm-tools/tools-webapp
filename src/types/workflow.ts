import { IQueryRequest } from './http';

export interface IWorkflow {
  _id: string;
  name: string;
  status: string;
  order: number;
}

/**
 * List Workflow
 */
export interface IListWorkflowParams<Q = Record<string, any>>
  extends IQueryRequest<Q> {}

export interface IListWorkflow extends Array<IWorkflow> {}
