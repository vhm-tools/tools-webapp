import {
  useReactTable,
  flexRender,
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import { IPaginationMeta } from '@/types/pagination';
import { Pagination } from './compoments/pagination';

interface Props<T> {
  data: T[];
  columns: ColumnDef<T>[];
  pagination: IPaginationMeta;
  meta?: any;
  onNextPage: () => void;
  onPrevPage: () => void;
}

export const Table = <T,>({
  data,
  columns,
  pagination,
  meta,
  onNextPage,
  onPrevPage,
}: Props<T>) => {
  const pageIndex = pagination.page ? pagination.page - 1 : 0;
  const pageSize = pagination.limit ? pagination.limit : 0;
  const pageCount = pagination.totalPage ? pagination.totalPage : 0;

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    initialState: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    meta,
    pageCount,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <table className="w-full mb-3">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="!border-px !border-gray-400">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  onClick={header.column.getToggleSortingHandler()}
                  className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pe-4 text-start"
                >
                  <div className="items-center justify-between text-gray-400">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="min-w-[150px] border-white/0 py-3 pe-4"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <hr className="mb-3" />
      <div className="flex justify-between">
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <Pagination
          onNextPage={onNextPage}
          onPrevPage={onPrevPage}
          hasPrevPage={pagination.hasPrevPage}
          hasNextPage={pagination.hasNextPage}
        />
      </div>
    </>
  );
};
