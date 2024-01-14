import { FC } from 'react';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';

type Props = {
  onNextPage: () => void;
  onPrevPage: () => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export const Pagination: FC<Props> = ({
  onNextPage,
  onPrevPage,
  hasNextPage,
  hasPrevPage,
}) => {
  return (
    <div className="flex justify-between">
      {/* <select */}
      {/*   value={table.getState().pagination.pageSize} */}
      {/*   onChange={(e) => { */}
      {/*     table.setPageSize(Number(e.target.value)); */}
      {/*   }} */}
      {/* > */}
      {/*   {[10, 20, 30, 40, 50].map((pageSize) => ( */}
      {/*     <option key={pageSize} value={pageSize}> */}
      {/*       Show {pageSize} */}
      {/*     </option> */}
      {/*   ))} */}
      {/* </select> */}
      <div className="pagination">
        <div className="join">
          <button
            className="join-item btn btn-sm"
            onClick={onPrevPage}
            disabled={!hasPrevPage}
          >
            <BiSolidLeftArrow />
          </button>
          <button className="join-item btn btn-sm">1</button>
          <button className="join-item btn btn-sm">2</button>
          <button className="join-item btn btn-sm btn-disabled">...</button>
          <button className="join-item btn btn-sm">99</button>
          <button className="join-item btn btn-sm">100</button>
          <button
            className="join-item btn btn-sm"
            onClick={onNextPage}
            disabled={!hasNextPage}
          >
            <BiSolidRightArrow />
          </button>
        </div>
      </div>
    </div>
  );
};
