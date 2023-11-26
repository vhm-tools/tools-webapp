import { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  isActive?: boolean;
  name: string;
  path: string;
};

const SidebarSubItem: FC<Props> = ({ name, path, isActive = false }) => {
  return (
    <li
      className={cn('my-[3px] rounded-xl', {
        'text-white bg-primary': isActive,
      })}
    >
      <Link to={path} className="py-3">
        {name}
      </Link>
    </li>
  );
};

export default SidebarSubItem;
