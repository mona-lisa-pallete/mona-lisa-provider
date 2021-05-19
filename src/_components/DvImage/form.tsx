import { Form, Input } from 'antd';
import React from 'react';

const DvImageForm: React.FC = () => {
  return (
    <Form className="dv-image-form">
      <Form.Item label="组件名称">
        <Input />
      </Form.Item>
    </Form>
  );
};
export default DvImageForm;
