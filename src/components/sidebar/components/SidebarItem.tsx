import { FC, useMemo } from 'react';
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
	const isActive = useMemo(() => {
		return location.pathname.includes(path);
	}, [location.pathname, path]);

	return (
		<li
			className={cn(
				'my-[3px] active rounded-xl font-bold dark:text-white text-black',
				{
					'dark:text-white': isActive,
					'text-white bg-primary': isActive && !children?.length,
				}
			)}
		>
			{children?.length ? (
				<details open>
					<summary className="px-4 py-4">
						{icon ? icon : <DashIcon />}
						{name}
					</summary>
					<ul>
						{children.map(({ props }, index) => (
							<SidebarSubItem
								key={index}
								name={props.name}
								path={props.path}
                isActive={location.pathname.includes(props.path)}
							/>
						))}
					</ul>
				</details>
			) : (
				<Link to={path} className="px-4 py-4">
					{icon ? icon : <DashIcon />} {name}
				</Link>
			)}
		</li>
	);
};

export default SidebarItem;
