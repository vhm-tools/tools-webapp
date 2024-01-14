import { FC } from 'react';
import cn from 'classnames';

type Props = {
  extra?: string;
};

export const Loader: FC<Props> = ({ extra }) => {
  return <div className={cn('loader', extra)}></div>;
};
