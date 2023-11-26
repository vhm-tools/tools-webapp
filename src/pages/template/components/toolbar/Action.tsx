import { FC } from 'react';

export const Action: FC = () => {
  return (
    <>
      <div className="text-xl font-bold text-navy-700 dark:text-white mb-3">
        Actions:
      </div>
      <div className="flex flex-col text-center">
        <div className="p-3 cursor-move bg-gray-100 mb-2">Delay</div>
      </div>
    </>
  );
};
