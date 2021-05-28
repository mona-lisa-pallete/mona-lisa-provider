import ConfirmModal from '@/components/ConfirmModal';
import { ConfirmModalFooter } from '@/components/ConfirmModal/index.style';
import { FormSubTitle } from '@/pages/editor/index.style';
import { MiniPageStyle, PlatformType } from '@/services/page/schema';
import { Button, Form, Input, Radio } from 'antd';
import React from 'react';
import { PageSettingModalProps } from './types';

const PageSettingModal: React.FC<PageSettingModalProps> = (props) => {
  const { visible, onChangeVisible } = props;
  const [form] = Form.useForm();

  return (
    <ConfirmModal
      onOk={() => {}}
      visible={visible}
      onChangeVisible={(val) => {
        onChangeVisible(val);
      }}
      width={656}
      footerRender={
        <ConfirmModalFooter>
          <Button
            onClick={() => {
              onChangeVisible(false);
            }}
          >
            取消
          </Button>
          <Button
            onClick={() => {
              // onOk();
            }}
          >
            保存
          </Button>
          <Button
            onClick={() => {
              // onOk();
            }}
            type="primary"
          >
            保存并上线
          </Button>
        </ConfirmModalFooter>
      }
    >
      <Form form={form} layout="vertical">
        <FormSubTitle>页面基础信息</FormSubTitle>
        <Form.Item label="页面标题">
          <Input />
        </Form.Item>
        <Form.Item label="页面类型">
          <Radio.Group>
            <Radio value={PlatformType.WEB}>H5</Radio>
            <Radio value={PlatformType.MINIAPP}>小程序</Radio>
            <Radio value={[PlatformType.WEB, PlatformType.MINIAPP]}>H5&小程序</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="小程序页面样式设置">
          {() => {
            // const isMiniApp = form.getFieldValue('')
            return (
              <Form.Item name="other">
                <Input />
              </Form.Item>
            );
          }}
          <Radio.Group>
            <Radio value={MiniPageStyle.Default}>默认样式</Radio>
            <Radio value={MiniPageStyle.SemiImmersion}>半沉浸式</Radio>
            <Radio value={MiniPageStyle.Immersion}>全沉浸式</Radio>
          </Radio.Group>
        </Form.Item>
        <FormSubTitle>页面分享配置</FormSubTitle>
      </Form>
    </ConfirmModal>
  );
};
export default PageSettingModal;
