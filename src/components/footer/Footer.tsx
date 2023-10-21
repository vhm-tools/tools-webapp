import { FC } from 'react';

export const Footer: FC = () => {
	return (
		<footer className="z-[5] mx-auto flex w-full max-w-screen-sm flex-col items-center justify-between px-[20px] pb-4 lg:mb-6 lg:max-w-[100%] lg:flex-row xl:mb-2 xl:w-[1310px] xl:pb-6">
			<p className="text-center text-sm text-gray-400">
				© {new Date().getFullYear()} VHM
			</p>
		</footer>
	);
};
