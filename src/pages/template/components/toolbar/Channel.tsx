import { FC } from 'react';

export const Channel: FC = () => {
  return (
    <>
      <div className="text-xl font-bold text-navy-700 dark:text-white mb-3">
        Channels:
      </div>
      <div className="flex flex-col text-center">
        <div className="p-3 cursor-move bg-gray-100 mb-2">Email</div>
        <div className="p-3 cursor-move bg-gray-100 mb-2">SMS</div>
        <div className="p-3 cursor-move bg-gray-100 mb-2">Push</div>
      </div>
    </>
  );
};
