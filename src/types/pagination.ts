export interface IPaginationQuery {
  page?: number;
  limit?: number;
  sort?: string;
  sortDirection?: string;
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  totalRecord: number;
  totalPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IPagination<T> {
  data: T[];
  meta: IPaginationMeta;
}
