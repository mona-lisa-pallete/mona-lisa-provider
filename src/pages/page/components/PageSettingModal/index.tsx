import ConfirmModal from '@/components/ConfirmModal';
import { ConfirmModalFooter } from '@/components/ConfirmModal/index.style';
import UploadTool from '@/components/UploadTool';
import { FormSubTitle } from '@/pages/editor/index.style';
import { MiniPageStyle, PlatformType } from '@/services/page/schema';
import { Button, Form, Input, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import { ShareFormContainer, ShareFormItem } from './index.style';
import { PageSettingModalProps } from './types';
import { useModel } from 'umi';
import { useSelectMaterial } from '@/hooks/material';
import { updatePage } from '@/services/page';
import { getPage } from '@/services/editor';

const { TextArea } = Input;

const PageSettingModal: React.FC<PageSettingModalProps> = (props) => {
  const { visible, onChangeVisible, id, beforeSave, onlineVal = true } = props;
  const [form] = Form.useForm();
  const { setMaterialVisible } = useModel('useMaterialModel');
  const [imgField, setImgField] = useState('');
  const [status, setStatus] = useState(false);
  const [online, setOline] = useState(false);

  const { selectMaterial, isSuccess } = useSelectMaterial();

  if (isSuccess && selectMaterial) {
    form.setFieldsValue({
      attributes: {
        [imgField]: selectMaterial.url,
      },
    });
  }

  //  miniappImmersion: string;
  //   shareTitle: string;
  //   shareDescription: string;
  //   shareImage: string;
  //   miniappShareTitle: string;
  //   miniappShareDescription: string;
  //   miniappShareImage: string;
  const submit = async (values: any) => {
    let pageId = id;
    if (beforeSave) {
      pageId = await beforeSave();
    }
    const {
      attributes: {
        shareTitle = '',
        shareDescription = '',
        shareImage = '',
        miniappShareTitle = '',
        miniappShareDescription = '',
        miniappShareImage = '',
        miniappTitle = '',
      },
      miniappImmersion,
      platform,
      name,
    } = values;
    const attributes: any = {
      shareTitle,
      shareDescription,
      shareImage,
      miniappShareTitle,
      miniappShareDescription,
      miniappShareImage,
      miniappTitle,
    };
    if (miniappImmersion) {
      attributes.miniappImmersion = miniappImmersion;
    }

    const requestData: any = {
      attributes,
      platform,
      name,
    };

    if (online) {
      requestData.action = 'online';
    }
    const res = await updatePage(pageId, requestData);
    if (res.code === 0) {
      onChangeVisible(false);
    }
  };

  useEffect(() => {
    if (!visible) {
      form.resetFields();
    }
  }, [form, visible]);

  useEffect(() => {
    if (visible && id) {
      const getData = async () => {
        const res = await getPage(id);
        if (res.code === 0) {
          const { name, attributes, status: pageStatus, platform } = res.data;
          const isBoth =
            platform.includes(PlatformType.MINIAPP) && platform.includes(PlatformType.WEB);
          const isMini = platform.includes(PlatformType.MINIAPP);
          const isH5 = platform.includes(PlatformType.WEB);
          let platformData: any = '';
          if (isBoth) {
            platformData = [PlatformType.WEB, PlatformType.MINIAPP];
          } else if (isMini) {
            platformData = PlatformType.MINIAPP;
          } else if (isH5) {
            platformData = PlatformType.WEB;
          }
          const formData = {
            name,
            attributes,
            platform: platformData,
          };
          if (pageStatus === 0) {
            setStatus(false);
          } else {
            setStatus(true);
          }
          form.setFieldsValue(formData);
        }
      };
      getData();
    }
  }, [visible]);

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
              setOline(false);
              form.submit();
            }}
          >
            保存
          </Button>
          {!status && id && onlineVal && (
            <Button
              onClick={() => {
                // onOk();
                setOline(true);
                form.submit();
              }}
              type="primary"
            >
              保存并上线
            </Button>
          )}
        </ConfirmModalFooter>
      }
    >
      <Form
        style={{
          maxHeight: 'calc(100vh - 250px)',
          overflow: 'auto',
        }}
        form={form}
        onFinish={submit}
        layout="vertical"
        initialValues={{
          platform: PlatformType.WEB,
          miniappImmersion: MiniPageStyle.Default,
        }}
      >
        <FormSubTitle>页面基础信息</FormSubTitle>
        <Form.Item label="页面名称" name="name">
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
              <Form.Item label="小程序页面样式设置" name="miniappImmersion">
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
            return (
              <ShareFormContainer>
                {(platform === PlatformType.WEB || Array.isArray(platform)) && (
                  <ShareFormItem>
                    <Form.Item label="页面标题" name={['attributes', 'title']}>
                      <Input maxLength={30} />
                    </Form.Item>
                    <Form.Item label="H5分享标题" name={['attributes', 'shareTitle']}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="H5分享文案" name={['attributes', 'shareDescription']}>
                      <TextArea />
                    </Form.Item>
                    <Form.Item name={['attributes', 'shareImage']} label="H5分享图片">
                      <UploadTool
                        onSelectMaterial={() => {
                          setImgField('shareImage');
                          setMaterialVisible(true);
                        }}
                      />
                    </Form.Item>
                  </ShareFormItem>
                )}
                {(platform === PlatformType.MINIAPP || Array.isArray(platform)) && (
                  <ShareFormItem>
                    <Form.Item name={['attributes', 'miniappTitle']} label="页面标题">
                      <Input maxLength={30} />
                    </Form.Item>
                    <Form.Item name={['attributes', 'miniappShareTitle']} label="小程序分享标题">
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name={['attributes', 'miniappShareDescription']}
                      label="小程序分享文案"
                    >
                      <TextArea />
                    </Form.Item>
                    <Form.Item name={['attributes', 'miniappShareImage']}>
                      <UploadTool
                        onSelectMaterial={() => {
                          setImgField('miniappShareImage');
                          setMaterialVisible(true);
                        }}
                      />
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
