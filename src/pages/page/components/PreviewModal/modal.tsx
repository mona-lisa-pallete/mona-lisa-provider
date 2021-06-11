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
import downloadjs from 'downloadjs';

interface PreviewModalProp {
  onChange: () => void;
  h5Url: string;
  miniappCodeUrl: string;
  miniappUrl: string;
  type: 'h5' | 'mini' | 'h5mini';
}

const PreviewModal: React.FC<PreviewModalProp> = (props) => {
  const { onChange, h5Url = 'http://www.baidu.com', miniappCodeUrl, miniappUrl, type } = props;
  const [h5QRCode, setH5QRCode] = useState('');

  useEffect(() => {
    QRCode.toDataURL(h5Url, {
      width: 128,
    }).then((url) => {
      setH5QRCode(url);
    });
  }, [h5Url]);

  return (
    <>
      <PreviewModalRoot>
        <div className="preview-modal__mask">
          <CloseOutlined className="preview-close" onClick={onChange} style={{ color: '#fff' }} />
          <PreviewPhoneContainer>
            <PreviewPhone src={phone} />
            <iframe frameBorder={0} src={h5Url} />
          </PreviewPhoneContainer>
          <PreviewQRContainer>
            {(type === 'h5' || type === 'h5mini') && (
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
                    <Button
                      onClick={() => {
                        downloadjs(h5QRCode);
                      }}
                    >
                      下载二维码
                    </Button>
                  </PreviewQRAction>
                </PreviewQRInfo>
              </PreviewQRItem>
            )}
            {(type === 'mini' || type === 'h5mini') && (
              <PreviewQRItem>
                <img src={miniappCodeUrl} />
                <PreviewQRInfo>
                  <PreviewQRName>小程序链接</PreviewQRName>
                  <PreviewQRLink>{miniappUrl}</PreviewQRLink>
                  <PreviewQRAction>
                    <Button
                      onClick={() => {
                        copy(miniappUrl);
                        message.success('复制成功');
                      }}
                    >
                      复制链接
                    </Button>
                    <Button
                      onClick={() => {
                        downloadjs(miniappCodeUrl);
                      }}
                    >
                      下载二维码
                    </Button>
                  </PreviewQRAction>
                </PreviewQRInfo>
              </PreviewQRItem>
            )}
          </PreviewQRContainer>
        </div>
      </PreviewModalRoot>
    </>
  );
};
export default PreviewModal;
