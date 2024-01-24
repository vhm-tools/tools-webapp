import { FC } from 'react';
import { Link, RouteObject, useLocation } from 'react-router-dom';
import cn from 'classnames';

import SidebarSubItem from './SidebarSubItem.tsx';
import { DashIcon } from '@/components/icons';

type Props = {
  name: string;
  path: string;
  icon?: JSX.Element;
  children?: Array<RouteObject & { props: RoutePropsType }>;
};

const SidebarItem: FC<Props> = ({ name, path, icon, children }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const isActive = pathname.includes(path);

  return (
    <li
      className={cn('my-[3px] active rounded-xl font-bold', {
        'bg-primary': isActive && !children?.length,
      })}
      style={{ color: isActive ? 'white' : 'black' }}
    >
      {children?.length ? (
        <details open>
          <summary
            className={cn('px-4 py-4 text-black', {
              'bg-lightPrimary': isActive,
            })}
          >
            {icon ? icon : <DashIcon />}
            {name}
          </summary>
          <ul>
            {children.map(({ props }, index) => {
              if (props.isHiden) return null;
              return (
                <SidebarSubItem
                  key={index}
                  name={props.name}
                  path={props.path}
                  isActive={location.pathname.includes(props.path)}
                />
              );
            })}
          </ul>
        </details>
      ) : (
        <Link
          to={path}
          className={cn('px-4 py-4', {
            'bg-primary': isActive,
          })}
          style={{ color: isActive ? 'white' : 'black' }}
        >
          {icon ? icon : <DashIcon />}
          {name}
        </Link>
      )}
    </li>
  );
};

export default SidebarItem;
