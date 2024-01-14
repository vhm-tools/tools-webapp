import { useState } from 'react';
import { FormikHelpers, useFormik } from 'formik';
import { useAlert } from 'react-alert';

/*
 * Components
 */
import { Button, Card, ErrorMessage } from '@/components';
import { InputField } from '@/components/fields';

import { ICreateTemplate } from '@/types/template';
import { createTemplateSchema } from '@/validations';
import { Toolbar, Workflow } from './components';
import { Node } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { TemplateRepository } from '@/apis';

const templateRepository = new TemplateRepository();

const initialNodes: Node[] = [
  {
    id: uuidv4(),
    type: 'workflowNode',
    position: { x: 0, y: 0 },
    data: {
      id: 'trigger',
      label: 'Workflow Trigger',
      icon: <AiOutlineThunderbolt size={18} />,
    },
  },
];

export const CreateTemplatePage = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);

  const alert = useAlert();

  const handleSubmit = async (
    values: ICreateTemplate,
    { resetForm }: FormikHelpers<ICreateTemplate>,
  ) => {
    try {
      if (nodes.length) {
        nodes.shift();
        values.steps = nodes.map((node) => ({
          id: node.data.id as string,
          label: node.data.label as string,
        }));
      }

      const response = await templateRepository.createTemplate(values);
      resetForm();

      if (response.statusCode !== 200) {
        return alert.error(response.message);
      }

      setNodes(initialNodes);
      alert.success('Create template successful');
    } catch (error: any) {
      alert.error(error.message);
    }
  };

  const initialValues: ICreateTemplate = {
    name: '',
    description: '',
    steps: [],
  };

  const formik = useFormik({
    validationSchema: createTemplateSchema,
    initialValues,
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex w-full">
      <Card extra="!p-[20px] w-2/4 mt-3 mr-3">
        <header className="relative flex flex-col items-start pt-4 mb-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Create new template
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
            <Button text="Create" type="submit" extra="w-2/5" />
          </div>
        </form>

        <Toolbar />
      </Card>
      <Card extra="!p-[20px] w-3/4 mt-3">
        <header className="relative flex flex-col items-start pt-4 mb-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Create your workflow
          </div>
          <p className="text-center text-base font-normal text-gray-600">
            Workflow template to start trigger event
          </p>
        </header>

        <Workflow nodes={nodes} setNodes={setNodes} />
      </Card>
    </div>
  );
};
