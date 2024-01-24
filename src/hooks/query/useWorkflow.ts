import { useQuery } from '@tanstack/react-query';
import { WorkflowRepository } from '@/apis';
import { IWorkflow } from '@/types/workflow';

const workflowRepository = new WorkflowRepository();

interface UseQueryParams {
  enabled: boolean;
}

interface UseWorkflowsParams {
  templateId: string;
}

type UseWorkflows = {
  data: Array<IWorkflow>;
  isLoading: boolean;
  refetch: () => any;
};

export const useQueryWorkflows = (
  params?: Partial<UseWorkflowsParams>,
  queryParams?: Partial<UseQueryParams>,
): UseWorkflows => {
  const { data, refetch, status, isError, isLoading } = useQuery({
    queryKey: ['workflows', params],
    queryFn: () =>
      workflowRepository.getList({
        query: {
          ...params,
        },
      }),
    enabled: true,
    staleTime: 1000 * 60 * 5,
    ...queryParams,
  });

  let result: Array<IWorkflow> = [];

  if (!isLoading && !isError && status === 'success') {
    result = data;
  }

  return {
    data: result,
    refetch,
    isLoading,
  };
};
