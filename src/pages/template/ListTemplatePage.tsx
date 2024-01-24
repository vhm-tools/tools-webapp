import { useRef, useState } from 'react';
import { useAlert } from 'react-alert';
import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { Card, Loader, Table } from '@/components';
import { ModalConfirm } from '@/components/modal';
import { useQueryTemplates } from '@/hooks/query/useTemplate';
import { ITemplate } from '@/types/template';
import { TemplateRepository } from '@/apis';
import { HttpStatusCode } from '@/constants/api';

import { MdEdit, MdDelete } from 'react-icons/md';
import { FaPlay } from 'react-icons/fa';

type TableMeta = {
  handleDelete: (id: string) => void;
  handleUpdate: () => void;
  handleTrigger: (id: string) => void;
};

const columns: ColumnDef<ITemplate>[] = [
  {
    cell: (info) => {
      const { original } = info.row;

      return (
        <Link
          to={`/admin/template/detail/${original._id}`}
          className="hover:text-brandLinear"
        >
          {info.getValue() as string}
        </Link>
      );
    },
    header: 'Name',
    accessorKey: 'name',
  },
  {
    cell: (info) => info.getValue(),
    header: 'Description',
    accessorKey: 'description',
  },
  {
    cell: ({ table, row }) => {
      const { handleDelete, handleUpdate, handleTrigger } = table.options
        .meta as TableMeta;

      return (
        <div className="flex">
          <button
            onClick={() => handleTrigger(row.original._id)}
            className="btn btn-circle bg-base-200 mr-2"
          >
            <FaPlay size={18} />
          </button>
          <button
            onClick={handleUpdate}
            className="btn btn-circle bg-base-200 mr-2"
          >
            <MdEdit size={18} />
          </button>
          <button
            onClick={() => handleDelete(row.original._id)}
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

const templateRepository = new TemplateRepository();

export const ListTemplatePage = () => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [page, setPage] = useState(1);

  const alert = useAlert();

  const { data, meta, refetch, isLoading } = useQueryTemplates({
    limit: 3,
    page,
  });

  const handleNextPage = () =>
    setPage((oldPage) => (oldPage < meta.totalPage ? oldPage + 1 : oldPage));

  const handlePrevPage = () =>
    setPage((oldPage) => (oldPage > 1 ? oldPage - 1 : 1));

  const handleDelete = (id: string) => {
    if (!modalRef.current) return;
    modalRef.current.dataset['id'] = id;
    modalRef.current.showModal();
  };

  const confirmDelete = async () => {
    if (!modalRef.current) return;

    try {
      const { dataset } = modalRef.current;
      const templateId = dataset['id'];

      if (!templateId) return alert.error('Template id not found');

      const response = await templateRepository.delete(templateId);

      if (response.status !== HttpStatusCode.NO_CONTENT) {
        return alert.error(response.statusText);
      }

      alert.info('Delete success!');
      refetch();
    } catch (error: any) {
      alert.error(error.message);
    }
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
            meta={{ handleDelete }}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
          />
        </div>

        <ModalConfirm
          ref={modalRef}
          title="Confirm Delete"
          description="You can't restore workflow again"
          extraBtnConfirm="btn-error text-white"
          onConfirm={confirmDelete}
        />
      </Card>
    </div>
  );
};
