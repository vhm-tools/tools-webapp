import { FC } from 'react';
import { Channel } from './Channel';
import { Action } from './Action';
import { Divider } from '@/components';

export const Toolbar: FC = () => {
  return (
    <div>
      <Action />
      <Divider />
      <Channel />
    </div>
  );
};
