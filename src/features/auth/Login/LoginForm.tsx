import { FormikHelpers, useFormik } from 'formik';
import { useAlert } from 'react-alert';
import Cookies from 'js-cookie';
import { fetchApi } from '@/apis';

type InitialValuesType = {
	username: string;
	password: string;
};

export const LoginForm = () => {
	const alert = useAlert();

	const handleSubmit = async (
		values: InitialValuesType,
		{ resetForm }: FormikHelpers<InitialValuesType>
	) => {
		try {
			const response = await fetchApi('auth/login', {
				method: 'POST',
				body: JSON.stringify(values),
			});
      const { metadata, data: token } = response;
			if (metadata.error) {
				return alert.error(metadata.message);
			}

      Cookies.set('token', token, { expires: 1 })

			alert.success('Login successful');
			resetForm();
		} catch (error: any) {
			alert.error(error.message);
		}
	};

	const formik = useFormik({
		initialValues: {
			username: '',
			password: '',
		},
		onSubmit: handleSubmit,
	});

	return (
		<div className="max-w-xs w-80">
			<form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<p className="text-2xl font-bold mb-4">Login</p>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="username"
					>
						Username
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="username"
						type="text"
						placeholder="Username"
						name="username"
						autoComplete="username"
						value={formik.values.username}
						onChange={formik.handleChange}
					/>
				</div>
				<div className="mb-6">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="password"
					>
						Password
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						id="password"
						type="password"
						placeholder="******************"
						name="password"
						autoComplete="current-password"
						value={formik.values.password}
						onChange={formik.handleChange}
					/>
					<p className="text-red-500 text-xs italic d-none">
						Please choose a password.
					</p>
				</div>
				<div className="flex items-center justify-between">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Sign In
					</button>
					<a
						className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
						href="#"
					>
						Forgot Password?
					</a>
				</div>
			</form>
		</div>
	);
};
