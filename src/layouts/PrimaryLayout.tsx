import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components';

{/* <div className='flex justify-evenly bg-neutral-200'> */}
export const PrimaryLayout = () => {
	return (
    <div className='bg-neutral-200'>
			<Sidebar />
			<div className="py-5 grow">
				<Outlet />
			</div>
		</div>
	);
};
