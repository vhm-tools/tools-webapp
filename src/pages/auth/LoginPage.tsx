import { FC } from 'react';
import { FormikHelpers, useFormik } from 'formik';
import { useAlert } from 'react-alert';

/**
 * Assets
 */
import { FcGoogle } from 'react-icons/fc';
import { FaGithubAlt } from 'react-icons/fa';

/**
 * Components
 */
import { Checkbox } from '@/components';
import { InputField } from '@/components/fields';

import { HttpRequest } from '@/apis/http';

type InitialValuesType = {
	account: string;
	password: string;
};

export const LoginPage: FC = () => {
	const alert = useAlert();
	const http = new HttpRequest();

	const handleLoginGitHub = async () => {
		alert.info('Logging in...');
		const url = `${import.meta.env.VITE_API_URL}/auth/github`;
		window.open(url, '_self');
	};

	const handleSubmit = async (
		values: InitialValuesType,
		{ resetForm }: FormikHelpers<InitialValuesType>
	) => {
		try {
			const response = await http.fetch(
				'auth/login',
				{
					method: 'POST',
					body: JSON.stringify(values),
				},
				{ addVersion: false }
			);

			const { metadata } = response;
			if (metadata.error) {
				return alert.error(metadata.message);
			}

			alert.success('Login successful');
			resetForm();
		} catch (error: any) {
			alert.error(error.message);
		}
	};

	const formik = useFormik({
		initialValues: {
			account: '',
			password: '',
		},
		onSubmit: handleSubmit,
	});

	return (
		<div className="mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
			{/* Sign in section */}
			<form
				onSubmit={formik.handleSubmit}
				className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]"
			>
				<h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
					Sign In
				</h4>
				<p className="mb-9 ml-1 text-base text-gray-600">
					Enter your email and password to sign in!
				</p>
				<button
					type="button"
					className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary dark:bg-navy-800 hover:cursor-pointer hover:opacity-60 transition duration-300 ease-in-out"
				>
					<div className="rounded-full text-xl">
						<FcGoogle />
					</div>
					<h5 className="text-sm font-medium text-navy-700 dark:text-white">
						Sign In with Google
					</h5>
				</button>
				<button
					onClick={handleLoginGitHub}
					type="button"
					className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800 hover:opacity-60 transition duration-300 ease-in-out"
				>
					<div className="rounded-full text-xl">
						<FaGithubAlt />
					</div>
					<h5 className="text-sm font-medium text-navy-700 dark:text-white">
						Sign In with Github
					</h5>
				</button>
				<div className="mb-6 flex items-center  gap-3">
					<div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
					<p className="text-base text-gray-600 dark:text-white"> or </p>
					<div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
				</div>
				{/* Account */}
				<InputField
					variant="auth"
					extra="mb-3"
					label="Email or Username (*)"
					placeholder="example@mail.com"
					autoComplete="username"
					id="account"
					name="account"
					type="text"
					value={formik.values.account}
					onChange={formik.handleChange}
				/>
				<p className="text-red-500 text-xs italic mb-4 hidden">
					Please choose a username or email.
				</p>

				{/* Password */}
				<InputField
					variant="auth"
					extra="mb-3"
					label="Password (*)"
					placeholder="******************"
					autoComplete="current-password"
					id="password"
					name="password"
					type="password"
					value={formik.values.password}
					onChange={formik.handleChange}
				/>
				<p className="text-red-500 text-xs italic mb-4 hidden">
					Please choose a password.
				</p>
				{/* Checkbox */}
				<div className="mb-4 flex items-center justify-between px-2">
					<div className="flex items-center">
						<Checkbox id="cbRememberMe" name="remember-me" />
						<label
							htmlFor="cbRememberMe"
							className="ml-2 text-sm font-medium text-navy-700 dark:text-white"
						>
							Keep me logged In
						</label>
					</div>
					<a
						className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
						href="#"
					>
						Forgot Password?
					</a>
				</div>
				<button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
					Sign In
				</button>
				{/* <div className="mt-4"> */}
				{/* 	<span className=" text-sm font-medium text-navy-700 dark:text-gray-600"> */}
				{/* 		Not registered yet? */}
				{/* 	</span> */}
				{/* 	<a */}
				{/* 		href=" " */}
				{/* 		className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white" */}
				{/* 	> */}
				{/* 		Create an account */}
				{/* 	</a> */}
				{/* </div> */}
			</form>
		</div>
	);
};
