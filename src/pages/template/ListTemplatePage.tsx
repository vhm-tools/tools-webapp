import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Card, Loader, Table } from '@/components';
import { useQueryTemplates } from '@/hooks/query/useTemplate';
import { ITemplate } from '@/types/template';

import { MdEdit, MdDelete } from 'react-icons/md';
import { FaPlay } from 'react-icons/fa';

type TableMeta = {
  handleDeleteTemplate: () => void;
  handleUpdateTemplate: () => void;
  handleTriggerTemplate: () => void;
};

const columns: ColumnDef<ITemplate>[] = [
  {
    cell: (info) => info.getValue(),
    header: 'Name',
    accessorKey: 'name',
  },
  {
    cell: (info) => info.getValue(),
    header: 'Description',
    accessorKey: 'createdAt',
  },
  {
    cell: ({ table, ...props }) => {
      console.log({ props, id: props.row.id, original: props.row.original });

      const {
        handleDeleteTemplate,
        handleUpdateTemplate,
        handleTriggerTemplate,
      } = table.options.meta as TableMeta;
      return (
        <div className="flex">
          <button
            onClick={handleTriggerTemplate}
            className="btn btn-circle bg-base-200 mr-2"
          >
            <FaPlay size={18} />
          </button>
          <button
            onClick={handleUpdateTemplate}
            className="btn btn-circle bg-base-200 mr-2"
          >
            <MdEdit size={18} />
          </button>
          <button
            onClick={handleDeleteTemplate}
            className="btn btn-circle bg-red-400 text-white"
          >
            <MdDelete size={18} />
          </button>
        </div>
      );
    },
    header: 'Actions',
  },
];

export const ListTemplatePage = () => {
  const [page, setPage] = useState(1);
  const { data, meta, isLoading } = useQueryTemplates({ limit: 3, page });

  const handleNextPage = () => {
    setPage((oldPage) => (oldPage < meta.totalPage ? oldPage + 1 : oldPage));
  };

  const handlePrevPage = () => {
    setPage((oldPage) => (oldPage > 1 ? oldPage - 1 : 1));
  };

  const handleDeleteTemplate = () => {
    console.log('Deleted');
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex w-full">
      <Card extra="!p-[20px] w-full mt-3 mr-3">
        <header className="relative flex items-center justify-between pt-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            List templates
          </div>

          {/* <CardMenu /> */}
        </header>

        <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
          <Table
            data={data}
            columns={columns}
            pagination={meta}
            meta={{ handleDeleteTemplate }}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
          />
        </div>
      </Card>
    </div>
  );
};
