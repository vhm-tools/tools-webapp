import { useFormik } from 'formik';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';

/*
 * Components
 */
import { Button, Card, ErrorMessage, Loader } from '@/components';
import { InputField } from '@/components/fields';

import { IUpdateTemplate } from '@/types/template';
import { updateTemplateSchema } from '@/validations';
import { Workflow } from './components';
import { TemplateRepository } from '@/apis';
import { HttpStatusCode } from '@/constants/api';
// import { useQueryWorkflows } from '@/hooks/query/useWorkflow';

const templateRepository = new TemplateRepository();

export const UpdateTemplatePage = () => {
  const { id: templateId } = useParams();
  const alert = useAlert();

  // const { data: listWorkflows, isLoading: isWorkflowLoading } =
  //   useQueryWorkflows({
  //     templateId,
  //   });

  const { data: templateInfo, isLoading } = useQuery({
    queryKey: ['template', templateId],
    queryFn: () => templateRepository.getInfo(templateId as string),
  });

  const handleSubmit = async (values: IUpdateTemplate) => {
    try {
      const response = await templateRepository.update(
        templateId as string,
        values,
      );

      if (response.statusCode !== HttpStatusCode.OK) {
        return alert.error(response.message);
      }

      alert.success('Update template successful');
    } catch (error: any) {
      alert.error(error.message);
    }
  };

  const initialValues: IUpdateTemplate = {
    name: templateInfo?.name || '',
    description: templateInfo?.description || '',
  };

  const formik = useFormik({
    validationSchema: updateTemplateSchema,
    enableReinitialize: true,
    initialValues,
    onSubmit: handleSubmit,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex w-full">
      <Card extra="!p-[20px] w-2/4 mt-3 mr-3">
        <header className="relative flex flex-col items-start pt-4 mb-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Update your template
          </div>
        </header>

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col justify-items-end mb-12"
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
            <Button
              text="Save"
              disabled={
                formik.values.name === templateInfo?.name &&
                formik.values.description === templateInfo?.description
              }
              type="submit"
              extra="w-2/5"
            />
          </div>
        </form>

        {/* <Toolbar /> */}
      </Card>
      <Card extra="!p-[20px] w-3/4 mt-3">
        <header className="relative flex flex-col items-start pt-4 mb-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Update your workflow
          </div>
          <p className="text-center text-base font-normal text-gray-600">
            Workflow template to start trigger event
          </p>
        </header>

        <Workflow flows={templateInfo?.flows} />
      </Card>
    </div>
  );
};
