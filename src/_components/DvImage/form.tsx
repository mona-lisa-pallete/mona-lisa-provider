import { Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { ReactNode, useEffect } from 'react';
import './form.less';
import UploadTool from './UploadTool/';

interface DvImageFormProps {
  data: any;
  onChange: (changedValues: any, allValues: any) => void;
  actionRender: React.Component | ReactNode;
}

const DvImageForm: React.FC<DvImageFormProps> = (props) => {
  const { onChange, data, actionRender } = props;
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  return (
    <Form onValuesChange={onChange} form={form} layout="vertical" className="dv-image-form">
      <div className="dv-image-form__sub-title">基础配置</div>
      <Form.Item name="title" label="组件名称">
        <Input />
      </Form.Item>
      <Form.Item name="url" label="图片素材">
        <UploadTool />
      </Form.Item>
      <div className="dv-image-form__sub-title">组件布局</div>
      <Form.Item label="所处位置">
        <Form.Item noStyle name={['style', 'left']}>
          <Input
            style={{
              width: '135px',
              marginRight: '16px',
            }}
            type="number"
            suffix="X"
          />
        </Form.Item>
        <Form.Item noStyle name={['style', 'top']}>
          <Input
            style={{
              width: '135px',
            }}
            type="number"
            suffix="Y"
          />
        </Form.Item>
      </Form.Item>
      <div className="dv-image-form__sub-title">交互配置</div>
      {actionRender}
    </Form>
  );
};
export default DvImageForm;
