import { FC } from 'react';

type Props = {
  data: Record<string, any>;
};

export const WorkflowNode: FC<Props> = ({ data }) => {
  return (
    <div className="flex justify-around items-center bg-white p-2 w-300 rounded-md hover:bg-gray-100 transition">
      {data.icon}
      <span className="text-sm ml-1">{data.label}</span>
    </div>
  );
};
