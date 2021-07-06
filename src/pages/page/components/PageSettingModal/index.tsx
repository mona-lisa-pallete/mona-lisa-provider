import ConfirmModal from '@/components/ConfirmModal';
import { ConfirmModalFooter } from '@/components/ConfirmModal/index.style';
import UploadTool from '@/components/UploadTool';
import { FormSubTitle } from '@/pages/editor/index.style';
import { MiniPageStyle, PlatformType } from '@/services/page/schema';
import { Button, Form, Input, Radio, Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import { PageTypeTipsContainer, ShareFormContainer, ShareFormItem } from './index.style';
import { PageSettingModalProps } from './types';
import { useModel } from 'umi';
import { useSelectMaterial } from '@/hooks/material';
import { updatePage } from '@/services/page';
import { getPage } from '@/services/editor';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const PageTypeTips = (
  <div>
    页面类型
    <Popover
      placement="bottom"
      content={
        <PageTypeTipsContainer>
          <div className="title">页面标题包含了H5标题和小程序标题</div>
          <div>H5样式</div>
          <img
            className="tips-img tips-img--first"
            src="https://static.guorou.net/course-static/56ebb00ede1a476fa1c036cd960f1d3b.png"
          />
          <div>小程序样式</div>
          <img
            className="tips-img"
            src="https://static.guorou.net/course-static/11cc92b6eeb14d118c1cd644070ce68c.png"
          />
        </PageTypeTipsContainer>
      }
    >
      <QuestionCircleOutlined
        style={{
          marginLeft: '9px',
        }}
      />
    </Popover>
  </div>
);

const MiniTips = (
  <div>
    小程序页面样式设置
    <Popover
      placement="bottom"
      content={
        <PageTypeTipsContainer>
          <div className="title">小程序可以设置样式展示</div>
          <div>默认形式：将保留小程序顶部信息栏和状态栏</div>
          <img
            className="tips-img tips-img--first"
            src="https://static.guorou.net/course-static/9f78c4aeea684959b337f771f13d9461.png"
          />
          <div>半沉浸式：将隐藏小程序状态栏，显示信息栏</div>
          <img
            className="tips-img tips-img--first"
            src="https://static.guorou.net/course-static/ba7e4ddb62e54bf29fe0ebbab8bb639e.png"
          />
          <div>全沉浸式：将隐藏小程序状态栏和信息栏</div>
          <img
            className="tips-img"
            src="https://static.guorou.net/course-static/9ff4fc183b73451aba70ea4b96cd4b23.png"
          />
        </PageTypeTipsContainer>
      }
    >
      <QuestionCircleOutlined
        style={{
          marginLeft: '9px',
        }}
      />
    </Popover>
  </div>
);

const PageShareTips = (
  <Popover
    placement="bottom"
    content={
      <PageTypeTipsContainer>
        <div className="title">页面分享包括H5分享和小程序分享</div>
        <div>H5</div>
        <img
          className="tips-img tips-img--first"
          src="https://static.guorou.net/course-static/20d438a0cdd148f188df8669e1d69a1a.png"
        />
        <div>小程序</div>
        <img
          className="tips-img"
          src="https://static.guorou.net/course-static/1fe1e3fc959f4a75b91647b7a025c951.png"
        />
      </PageTypeTipsContainer>
    }
  >
    <QuestionCircleOutlined
      style={{
        marginLeft: '9px',
      }}
    />
  </Popover>
);

const PageSettingModal: React.FC<PageSettingModalProps> = (props) => {
  const { visible, onChangeVisible, id, beforeSave, onlineVal = true } = props;
  const [form] = Form.useForm();
  const { setMaterialVisible } = useModel('useMaterialModel');
  const [imgField, setImgField] = useState('');
  const [status, setStatus] = useState(false);
  const [online, setOline] = useState(false);
  const { selectMaterial, isSuccess } = useSelectMaterial();

  useEffect(() => {
    if (isSuccess && selectMaterial) {
      form.setFieldsValue({
        attributes: {
          [imgField]: selectMaterial.url,
        },
      });
    }
  }, [form, imgField, selectMaterial, isSuccess]);

  //  miniappImmersion: string;
  //   shareTitle: string;
  //   shareDescription: string;
  //   shareImage: string;
  //   miniappShareTitle: string;
  //   miniappShareDescription: string;
  //   miniappShareImage: string;
  const submit = async (values: any) => {
    let pageId = id;
    const {
      attributes: {
        shareTitle = '',
        shareDescription = '',
        shareImage = '',
        miniappShareTitle = '',
        miniappShareDescription = '',
        miniappShareImage = '',
        miniappTitle = '',
        title = '',
      },
      miniappImmersion,
      platform,
      name,
    } = values;
    if (beforeSave) {
      pageId = await beforeSave(name);
    }
    const attributes: any = {
      shareTitle,
      shareDescription,
      shareImage,
      miniappShareTitle,
      miniappShareDescription,
      miniappShareImage,
      miniappTitle,
      title,
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
  }, [form, visible, id]);

  return (
    <ConfirmModal
      onOk={() => {}}
      visible={visible}
      onChangeVisible={(val) => {
        onChangeVisible(val);
      }}
      title={'页面设置'}
      width={656}
      forceRender
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
            type="primary"
            onClick={() => {
              // onOk();
              setOline(false);
              form.submit();
            }}
          >
            保存
          </Button>
          {id && onlineVal && (
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
          paddingRight: '12px',
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
        <Form.Item label={PageTypeTips} name="platform">
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
              <Form.Item label={MiniTips} name="miniappImmersion">
                <Radio.Group>
                  <Radio value={MiniPageStyle.Default}>默认样式</Radio>
                  <Radio value={MiniPageStyle.SemiImmersion}>半沉浸式</Radio>
                  <Radio value={MiniPageStyle.Immersion}>全沉浸式</Radio>
                </Radio.Group>
              </Form.Item>
            );
          }}
        </Form.Item>
        <FormSubTitle>页面分享配置 {PageShareTips}</FormSubTitle>
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
                    <Form.Item label="小程序分享图片" name={['attributes', 'miniappShareImage']}>
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
export default React.memo(PageSettingModal);
