import { FC, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  name: string;
}

export const Channel: FC<Props> = ({ name, ...props }) => {
  return (
    <>
      <div className="p-3 cursor-move bg-gray-100 mb-2 dndnode" {...props}>
        {name}
      </div>
    </>
  );
};
