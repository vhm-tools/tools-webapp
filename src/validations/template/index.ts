import { object, string } from 'yup';
import { ICreateTemplate, IUpdateTemplate } from '@/types/template';

export const createTemplateSchema = object<ICreateTemplate>({
  name: string().min(2, 'Too Short!').required('Name is required'),
  description: string().min(5, 'Too short!').optional(),
});

export const updateTemplateSchema = object<IUpdateTemplate>({
  name: string().min(2, 'Too Short!').required('Name is required'),
  description: string().min(5, 'Too short!').optional(),
});
