import React, { useEffect, useState } from 'react';
import {
  PreviewModalRoot,
  PreviewPhone,
  PreviewPhoneBG,
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
import PreviewHeader from '@/assets/img/common/preview-header.png';
import QRCode from 'qrcode';
import copy from 'copy-to-clipboard';
import downloadjs from 'downloadjs';
// import { PreviewRuntime } from './preview-runtime';

import './index.less';

interface PreviewModalProp {
  onChange: () => void;
  h5Url: string;
  miniappCodeUrl: string;
  miniappUrl: string;
  type: 'h5' | 'mini' | 'h5mini';
  editorState: any;
}

const PreviewModal: React.FC<PreviewModalProp> = (props) => {
  const {
    onChange,
    h5Url = 'http://www.baidu.com',
    miniappCodeUrl,
    miniappUrl,
    type = 'h5',
    // editorState,
  } = props;
  const [h5QRCode, setH5QRCode] = useState('');
  const [miniAppQRCode, setMiniAppQRCode] = useState('');

  useEffect(() => {
    QRCode.toDataURL(h5Url, {
      width: 128,
    }).then((url) => {
      setH5QRCode(url);
    });
  }, [h5Url]);

  useEffect(() => {
    if (miniappUrl) {
      if (miniappCodeUrl && miniappCodeUrl.includes('http')) {
        setMiniAppQRCode(miniappCodeUrl);
      } else {
        QRCode.toDataURL(miniappUrl, {
          width: 128,
        }).then((url) => {
          setMiniAppQRCode(url);
        });
      }
    }
  }, [miniappUrl]);
  return (
    <>
      <PreviewModalRoot>
        <div className="preview-modal__mask">
          <CloseOutlined className="preview-close" onClick={onChange} style={{ color: '#fff' }} />
          <PreviewPhoneContainer>
            <PreviewPhone>
              <img
                style={{
                  position: 'absolute',
                  top: '80px',
                  right: '20px',
                  left: '20px',
                  width: '320px',
                }}
                src={PreviewHeader}
              />
              <PreviewPhoneBG src={phone} style={{ width: '100%' }} />
            </PreviewPhone>
            {/* <PreviewRuntime editorState={editorState?.state} /> */}
            <iframe frameBorder={0} src={h5Url} />
          </PreviewPhoneContainer>
          <PreviewQRContainer>
            {(!type || type === 'h5' || type === 'h5mini') && (
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
                <img src={miniAppQRCode} />
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
                        downloadjs(miniAppQRCode);
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
