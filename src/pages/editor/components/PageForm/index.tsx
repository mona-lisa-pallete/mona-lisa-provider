import UploadTool from '@/components/UploadTool';
import { Form, Input, Radio } from 'antd';
import React from 'react';
import { FormSubTitle } from '../../index.style';
import { RadioGroup, TextInput } from './index.style';

const PageForm: React.FC = () => {
  return (
    <Form layout="vertical">
      <FormSubTitle>页面基础信息</FormSubTitle>
      <Form.Item label="页面标题">
        <Input />
      </Form.Item>
      <Form.Item label="页面类型">
        <RadioGroup>
          <Radio.Button>H5</Radio.Button>
          <Radio.Button>小程序</Radio.Button>
          <Radio.Button>小程序&H5</Radio.Button>
        </RadioGroup>
      </Form.Item>
      <FormSubTitle>页面基础信息</FormSubTitle>
      <Form.Item label="分享标题">
        <Input />
      </Form.Item>
      <Form.Item label="分享文案">
        <TextInput
          style={{
            height: '80px',
          }}
        />
      </Form.Item>
      <Form.Item label="分享图片">
        <UploadTool />
      </Form.Item>
    </Form>
  );
};

export default PageForm;
