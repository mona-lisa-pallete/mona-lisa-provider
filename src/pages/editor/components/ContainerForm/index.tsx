import { Form, InputNumber } from 'antd';
import React, { useEffect } from 'react';
import { FormSubTitle } from '../../index.style';
import { ContainerFormProps } from './types';

const ContainerForm: React.FC<ContainerFormProps> = (props) => {
  const { values, onChange } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  const handleChange = (_: any, all: any) => {
    onChange(all?.height);
  };

  return (
    <div>
      <FormSubTitle>基础配置</FormSubTitle>
      <Form form={form} onValuesChange={handleChange}>
        <Form.Item name="height">
          <InputNumber min={1} />
        </Form.Item>
      </Form>
    </div>
  );
};
export default ContainerForm;
