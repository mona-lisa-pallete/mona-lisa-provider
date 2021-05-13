import React from 'react';
import {
  PreviewModalRoot,
  PreviewPhone,
  PreviewPhoneContainer,
  PreviewQRAction,
  PreviewQRContainer,
  PreviewQRInfo,
  PreviewQRItem,
  PreviewQRLink,
  PreviewQRName,
} from './index.style';
import phone from '@/assets/img/common/phone.png';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

interface PreviewModalProp {
  onChange: () => void;
}

const PreviewModal: React.FC<PreviewModalProp> = (props) => {
  const { onChange } = props;

  return (
    <>
      <PreviewModalRoot>
        <div className="preview-modal__mask">
          <CloseOutlined className="preview-close" onClick={onChange} style={{ color: '#fff' }} />
          <PreviewPhoneContainer>
            <PreviewPhone src={phone} />
            <iframe frameBorder={0} src="https://www.baidu.com" />
          </PreviewPhoneContainer>
          <PreviewQRContainer>
            <PreviewQRItem>
              <img src="" alt="" />
              <PreviewQRInfo>
                <PreviewQRName>H5链接</PreviewQRName>
                <PreviewQRLink>https://ant.design/components/overview-cn/</PreviewQRLink>
                <PreviewQRAction>
                  <Button>复制链接</Button>
                  <Button>下载二维码</Button>
                </PreviewQRAction>
              </PreviewQRInfo>
            </PreviewQRItem>
            <PreviewQRItem>
              <img src="" alt="" />
              <PreviewQRInfo>
                <PreviewQRName>小程序链接</PreviewQRName>
                <PreviewQRLink>https://ant.design/components/overview-cn/</PreviewQRLink>
                <PreviewQRAction>
                  <Button>复制链接</Button>
                  <Button>下载二维码</Button>
                </PreviewQRAction>
              </PreviewQRInfo>
            </PreviewQRItem>
          </PreviewQRContainer>
        </div>
      </PreviewModalRoot>
    </>
  );
};
export default PreviewModal;
