import { FC } from 'react';
import cn from 'classnames';

type Props = {
  extra?: string;
};

export const Divider: FC<Props> = ({ extra }) => {
  return (
    <hr
      className={cn(
        'my-6 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50',
        extra,
      )}
    />
  );
};
