import { ReactNode } from 'react';
import { Formik, FormikProps } from 'formik';

interface Props<V> {
	initialValues: V;
	onSubmit: (values: V) => void;
  callback: (formikProps: FormikProps<V>) => ReactNode
}

export const CustomForm = <V extends object>(
	props: Props<V> & { children?: ReactNode }
) => {
	return (
		<Formik initialValues={props.initialValues} onSubmit={props.onSubmit}>
			{props.callback}
		</Formik>
	);
};
