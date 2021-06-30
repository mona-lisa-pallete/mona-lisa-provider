import { Form, Input } from 'antd';
import React, { useEffect } from 'react';

const Component: React.FC = (props) => {
  const { value, onChange } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(value);
  }, [value]);

  return (
    <Form
      form={form}
      onValuesChange={(v, all) => {
        onChange(all);
      }}
    >
      <Form.Item name="abc">
        <Input />
      </Form.Item>
      <Form.Item name="def">
        <Input />
      </Form.Item>
    </Form>
  );
};
export default Component;
