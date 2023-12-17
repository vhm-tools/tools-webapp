interface IWorkflowStep {
  id: string;
}

export interface ICreateTemplate {
  name: string;
  description: string;
  steps: IWorkflowStep[];
}
