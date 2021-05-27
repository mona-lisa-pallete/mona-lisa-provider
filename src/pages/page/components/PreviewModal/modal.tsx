import React, { useEffect, useState } from 'react';
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
import { Button, message } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import QRCode from 'qrcode';
import copy from 'copy-to-clipboard';

interface PreviewModalProp {
  onChange: () => void;
  h5Url: string;
}

const PreviewModal: React.FC<PreviewModalProp> = (props) => {
  const { onChange, h5Url = 'http://www.baidu.com' } = props;
  const [h5QRCode, setH5QRCode] = useState('');
  const [miniQRCode] = useState('');

  useEffect(() => {
    QRCode.toDataURL(h5Url, {
      width: 128,
    }).then((url) => {
      setH5QRCode(url);
    });
  }, []);

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
              <img src={h5QRCode} />
              <PreviewQRInfo>
                <PreviewQRName>H5链接</PreviewQRName>
                <PreviewQRLink>{h5Url}</PreviewQRLink>
                <PreviewQRAction>
                  <Button
                    onClick={() => {
                      copy(h5Url);
                      message.success('复制成功');
                    }}
                  >
                    复制链接
                  </Button>
                  <Button onClick={() => {}}>下载二维码</Button>
                </PreviewQRAction>
              </PreviewQRInfo>
            </PreviewQRItem>
            <PreviewQRItem>
              <img src={miniQRCode} />
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
