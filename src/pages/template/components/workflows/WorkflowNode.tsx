import { FC } from 'react';
import { Handle, Position } from 'reactflow';

type Props = {
  data: Record<string, any>;
  isConnectable: boolean;
};

export const WorkflowNode: FC<Props> = ({ data, isConnectable }) => {
  return (
    <div className="flex justify-around items-center bg-white p-2 w-300 rounded-md hover:bg-gray-100 transition">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      {data.icon}
      <span className="text-sm ml-1">{data.label}</span>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
};
