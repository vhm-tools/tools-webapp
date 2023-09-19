import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components';

export const PrimaryLayout = () => {
	return (
		<div className='w-4/5 flex justify-evenly bg-neutral-200'>
			<Navbar />
			<div className="flex flex-col items-center justify-center py-5">
				<Outlet />
			</div>
		</div>
	);
};
