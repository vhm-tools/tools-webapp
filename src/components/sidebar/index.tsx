import { FC } from 'react';
import { RouteObject } from 'react-router-dom';

import { HiX } from 'react-icons/hi';

import { ERoute, routes } from '@/routes';
import SidebarItem from './components/SidebarItem';

type RouterChildren = Array<RouteObject & { props: RoutePropsType }>;

type Props = {
  open: boolean;
  onClose: React.MouseEventHandler<HTMLSpanElement>;
};

export const Sidebar: FC<Props> = ({ open, onClose }) => {
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? 'translate-x-0' : '-translate-x-96'
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[50px] flex items-center`}>
        <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          VHM <span className="font-medium">Tools</span>
        </div>
      </div>
      <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />

      <ul className="menu w-full rounded-box mb-auto pt-1">
        {routes[ERoute.ADMIN].children.map((route, index) => {
          const { name, icon } = route.props;

          return (
            <SidebarItem
              key={`${index + 1}-${route.path}`}
              name={name}
              path={route.path}
              icon={icon}
              children={route.children as RouterChildren}
            />
          );
        })}
      </ul>
    </div>
  );
};
