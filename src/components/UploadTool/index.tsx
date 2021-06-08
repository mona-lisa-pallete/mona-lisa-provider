import { getUploadPolicy } from '@/services/common';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import React, { useState } from 'react';
import { UploadButton } from './index.style';
import { UploadToolProps } from './types';

const DIR_PATH = 'kbase/davinciprovider/assets';

const ossPath = 'https://static-zy-com.oss-cn-hangzhou.aliyuncs.com/';

const getFileName = (fileName: string, uid: string) => {
  return `${uid}${/(\..+)$/.exec(fileName)![0]}`;
};

const UploadTool: React.FC<UploadToolProps> = (props) => {
  const {
    value,
    onChange,
    onOriginChange,
    onSelectMaterial,
    uploadText,
    uploadContent,
    accept,
    multiple = false,
    onProgress,
    ...extraProps
  } = props;
  const [policy, setPolicy] = useState<any>({});

  const getData = (file: UploadFile<any>) => {
    return {
      ...policy,
      key: `${DIR_PATH}/${getFileName(file.name, file.uid)}`,
    };
  };
  const handleBeforeUpload = async () => {
    const res = await getUploadPolicy({
      dirPath: DIR_PATH,
    });

    if (res.code !== 0) {
      return Promise.reject();
    }

    setPolicy(res.data);

    return Promise.resolve();
  };

  const handleChange = (params: UploadChangeParam<UploadFile<any>>) => {
    const { file, fileList } = params;
    // const files = fileList.map((e) => {
    //   return {
    //     ...e,
    //     url:
    //       e.status === 'done'
    //         ? `https://static.guorou.net/${DIR_PATH}/${getFileName(e.name, e.uid)}`
    //         : '',
    //   };
    // });
    const files = fileList.map((e) => {
      return {
        ...e,
        url:
          e.status === 'done'
            ? `https://static.guorou.net/${DIR_PATH}/${getFileName(e.name, e.uid)}`
            : '',
      };
    });
    onOriginChange && onOriginChange({ ...params, fileList: files }); // 向上透传原属性

    if (multiple) {
      if (files) {
        onProgress && onProgress(files);
      }
      if (files && !files.some((i) => i.status !== 'done')) {
        // @ts-ignore
        onChange(files);
        // onChangeFile && onChangeFile(file);
      }
    } else {
      if (file) {
        // @ts-ignore
        onProgress && onProgress(file);
      }
      if (file.status === 'done') {
        if (file && onChange) {
          onChange(`https://static.guorou.net/${DIR_PATH}/${getFileName(file.name, file.uid)}`);
        }
      }
    }
  };

  let imgUrl;
  if (!multiple) {
    imgUrl = value;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    imgUrl === (value as any)?.[0]?.url;
  }

  return (
    <div>
      <Upload.Dragger
        onChange={handleChange}
        action={ossPath}
        data={getData}
        accept={accept}
        showUploadList={false}
        multiple={multiple}
        beforeUpload={handleBeforeUpload}
        {...extraProps}
      >
        {!imgUrl && !uploadContent && (
          <UploadButton>
            <PlusOutlined style={{ color: '#8E91A3', fontSize: '20px', marginBottom: '6px' }} />
            {uploadText || '添加图片'}
          </UploadButton>
        )}
        {uploadContent}
        {imgUrl && !uploadContent && (
          <img
            style={{
              margin: '0 auto',
              display: 'block',
              maxWidth: '287px',
            }}
            src={imgUrl}
          />
        )}
      </Upload.Dragger>
      <Button
        style={{
          width: '100%',
          marginTop: '10px',
          color: 'rgba(5, 12, 50, 0.7)',
        }}
        onClick={() => {
          onSelectMaterial();
        }}
      >
        <svg
          style={{
            marginRight: '8px',
          }}
          className="icon"
          aria-hidden="true"
        >
          <use xlinkHref="#iconsucaiku" />
        </svg>
        素材库选择
      </Button>
    </div>
  );
};
export default UploadTool;
