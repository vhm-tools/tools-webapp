import { object, string } from 'yup';
import { ICreateTemplate } from '@/types';

export const createTemplateSchema = object<ICreateTemplate>({
	name: string().min(2, 'Too Short!').required('Name is required'),
	description: string().min(5, 'Too short!').optional(),
});
