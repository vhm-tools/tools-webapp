import { FormikHelpers, useFormik } from 'formik';
import { useAlert } from 'react-alert';

/*
 * Components
 */
import { Button, Card, ErrorMessage } from '@/components';
import { InputField } from '@/components/fields';

import { HttpRequest } from '@/apis/http';
import { ICreateTemplate } from '@/types';
import { createTemplateSchema } from '@/validations';

export const CreateTemplatePage = () => {
	const alert = useAlert();
	const http = new HttpRequest();

	const handleSubmit = async (
		values: ICreateTemplate,
		{ resetForm }: FormikHelpers<ICreateTemplate>
	) => {
		try {
			const { statusCode } = await http.fetch<ICreateTemplate>(
				'template/create',
				{
					method: 'POST',
					body: JSON.stringify(values),
				}
			);
			resetForm();

			if (statusCode !== 200) {
				return alert.error('Create template failed');
			}

			alert.success('Create template successful');
		} catch (error: any) {
			alert.error(error.message);
		}
	};

	const initialValues: ICreateTemplate = {
		name: '',
		description: '',
	};

	const formik = useFormik({
		validationSchema: createTemplateSchema,
		initialValues,
		onSubmit: handleSubmit,
	});

	return (
		<div className="flex w-full flex-col">
			<Card extra="!p-[20px] w-2/5 mt-3">
				<header className="relative flex flex-col items-start pt-4 mb-4">
					<div className="text-xl font-bold text-navy-700 dark:text-white">
						Create new template
					</div>
					<p className="text-center text-base font-normal text-gray-600">
						Workflow template to start trigger event
					</p>
				</header>

				<form
					onSubmit={formik.handleSubmit}
					className="flex flex-col justify-items-end"
				>
					<InputField
						variant="default"
						extra="mb-2"
						label="Name (*)"
						placeholder="reset-pass-template"
						id="name"
						name="name"
						type="text"
						value={formik.values.name}
						onChange={formik.handleChange}
						isError={formik.touched.name && !!formik.errors.name}
						errorElement={
							<ErrorMessage text={formik.errors.name} extra="mt-2 mx-2" />
						}
					/>
					<InputField
						variant="default"
						extra="mb-3 mt-3"
						label="Description"
						placeholder="Description for template"
						id="description"
						name="description"
						type="text"
						value={formik.values.description}
						onChange={formik.handleChange}
						isError={formik.touched.description && !!formik.errors.description}
						errorElement={
							<ErrorMessage
								text={formik.errors.description}
								extra="mt-2 mx-2"
							/>
						}
					/>
					<div className="w-full flex justify-end">
						<Button text="Create" type="submit" extra="w-2/5" />
					</div>
				</form>
			</Card>
		</div>
	);
};
