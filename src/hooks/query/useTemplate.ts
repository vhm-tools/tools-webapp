import { useQuery } from '@tanstack/react-query';
import { TemplateRepository } from '@/apis';
import { ITemplate } from '@/types/template';
import { IPaginationMeta, IPaginationQuery } from '@/types/pagination';

const templateRepository = new TemplateRepository();

interface UseQueryParams {
  enabled: boolean;
}

interface UseTemplatesParams extends IPaginationQuery {
  keyword: string;
  limit: number;
}

type UseTemplates = {
  data: Array<ITemplate>;
  meta: IPaginationMeta;
  isLoading: boolean;
  refetch: () => any;
};

export const useQueryTemplates = (
  params?: Partial<UseTemplatesParams>,
  queryParams?: Partial<UseQueryParams>,
): UseTemplates => {
  const { data, refetch, status, isError, isLoading } = useQuery({
    queryKey: ['templates', params],
    queryFn: () =>
      templateRepository.getList({
        query: {
          ...params,
        },
      }),
    enabled: true,
    staleTime: 1000 * 60 * 5, // Infinity,
    ...queryParams,
  });

  let result: Array<ITemplate> = [];
  let meta: IPaginationMeta = {
    page: 0,
    limit: 0,
    totalRecord: 0,
    totalPage: 0,
    hasNextPage: false,
    hasPrevPage: false,
  };

  if (!isLoading && !isError && status === 'success') {
    ({ meta, data: result } = data);
  }

  return {
    data: result,
    meta,
    refetch,
    isLoading,
  };
};
