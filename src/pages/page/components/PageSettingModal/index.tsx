import ConfirmModal from '@/components/ConfirmModal';
import { ConfirmModalFooter } from '@/components/ConfirmModal/index.style';
import UploadTool from '@/components/UploadTool';
import { FormSubTitle } from '@/pages/editor/index.style';
import { MiniPageStyle, PlatformType } from '@/services/page/schema';
import { Button, Form, Input, Radio } from 'antd';
import React from 'react';
import { ShareFormContainer, ShareFormItem } from './index.style';
import { PageSettingModalProps } from './types';
import { useModel } from 'umi';
import { useDeepCompareEffect } from 'react-use';

const { TextArea } = Input;

const PageSettingModal: React.FC<PageSettingModalProps> = (props) => {
  const { visible, onChangeVisible } = props;
  const [form] = Form.useForm();
  const { setMaterialVisible, selectedData, materialVisible } = useModel('useMaterialModel');

  useDeepCompareEffect(() => {
    if (selectedData?.url && !materialVisible) {
      form.setFieldsValue({
        shareImage: selectedData.url,
      });
      console.log(selectedData);
    }
  }, [selectedData]);

  return (
    <ConfirmModal
      onOk={() => {}}
      visible={visible}
      onChangeVisible={(val) => {
        onChangeVisible(val);
      }}
      title={'页面设置'}
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
        <Form.Item label="页面标题" name="name">
          <Input maxLength={30} />
        </Form.Item>
        <Form.Item label="页面类型" name="platform">
          <Radio.Group>
            <Radio value={PlatformType.WEB}>H5</Radio>
            <Radio value={PlatformType.MINIAPP}>小程序</Radio>
            <Radio value={[PlatformType.WEB, PlatformType.MINIAPP]}>H5&小程序</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
          {() => {
            const platform = form.getFieldValue('platform');
            if (platform === PlatformType.WEB || !platform) {
              return null;
            }
            return (
              <Form.Item label="小程序页面样式设置">
                <Radio.Group>
                  <Radio value={MiniPageStyle.Default}>默认样式</Radio>
                  <Radio value={MiniPageStyle.SemiImmersion}>半沉浸式</Radio>
                  <Radio value={MiniPageStyle.Immersion}>全沉浸式</Radio>
                </Radio.Group>
              </Form.Item>
            );
          }}
        </Form.Item>
        <FormSubTitle>页面分享配置</FormSubTitle>
        <Form.Item noStyle shouldUpdate>
          {() => {
            const platform = form.getFieldValue('platform');
            console.log(platform);

            return (
              <ShareFormContainer>
                {(platform === PlatformType.WEB || Array.isArray(platform)) && (
                  <ShareFormItem>
                    <Form.Item label="H5分享标题">
                      <Input />
                    </Form.Item>
                    <Form.Item label="H5分享文案">
                      <TextArea />
                    </Form.Item>
                    <Form.Item name="shareImage" label="H5分享图片">
                      <UploadTool
                        onSelectMaterial={() => {
                          console.log('onSelectMaterial');

                          setMaterialVisible(true);
                        }}
                      />
                    </Form.Item>
                  </ShareFormItem>
                )}
                {(platform === PlatformType.MINIAPP || Array.isArray(platform)) && (
                  <ShareFormItem>
                    <Form.Item label="小程序分享标题">
                      <Input />
                    </Form.Item>
                    <Form.Item label="小程序分享文案">
                      <TextArea />
                    </Form.Item>
                    <Form.Item label="小程序分享图片">
                      <UploadTool onSelectMaterial={() => {}} />
                    </Form.Item>
                  </ShareFormItem>
                )}
              </ShareFormContainer>
            );
          }}
        </Form.Item>
      </Form>
    </ConfirmModal>
  );
};
export default PageSettingModal;
