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
        'bg-primary': isActive,
      })}
      style={{ color: isActive ? 'white' : 'black' }}
    >
      <Link
        to={path}
        className="py-3"
        style={{ color: isActive ? 'white' : 'black' }}
      >
        {name}
      </Link>
    </li>
  );
};

export default SidebarSubItem;
