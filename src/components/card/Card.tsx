import { FC } from 'react';

type Props = {
	variant?: string;
	extra?: string;
	children?: JSX.Element | any[];
	[x: string]: any;
};

export const Card: FC<Props> = (props) => {
	const { extra, children, ...rest } = props;
	return (
		<div
			className={`relative flex flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none ${extra}`}
			{...rest}
		>
			{children}
		</div>
	);
};
