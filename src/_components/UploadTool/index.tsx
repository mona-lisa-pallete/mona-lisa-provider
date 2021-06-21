import { getUploadPolicy } from '@/services/common';
import { Button, Upload } from 'antd';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import React, { useState } from 'react';
import { UploadToolProps } from './types';

const DIR_PATH = 'kbase/davinciprovider/assets';

const ossPath = 'https://static-zy-com.oss-cn-hangzhou.aliyuncs.com/';

const getFileName = (fileName: string, uid: string) => {
  return `${uid}${/(\..+)$/.exec(fileName)![0]}`;
};

const UploadTool: React.FC<UploadToolProps> = (props) => {
  const {
    onChange,
    onOriginChange,
    onSelectMaterial,
    onProgress,
    beforeUpload,
    ...extraProps
  } = props;
  const { multiple = false } = extraProps;
  const [policy, setPolicy] = useState<any>({});

  const getData = (file: UploadFile<any>) => {
    return {
      ...policy,
      key: `${DIR_PATH}/${getFileName(file.name, file.uid)}`,
    };
  };
  const handleBeforeUpload = async (file: RcFile, FileList: RcFile[]) => {
    if (beforeUpload) {
      await beforeUpload(file, FileList);
    }
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
    if (multiple) {
      const files = fileList.map((e) => {
        return {
          ...e,
          url:
            e.name &&
            e.uid &&
            `https://static.guorou.net/${DIR_PATH}/${getFileName(e.name, e.uid)}`,
        };
      });
      onOriginChange && onOriginChange(params);
      // @ts-ignore
      onProgress && onProgress(files);
      // @ts-ignore
      onChange(files);
    } else {
      if (file) {
        // @ts-ignore
        onProgress && onProgress(file);
      }
      if (file && onChange) {
        const _file = {
          ...file,
          url:
            file.name &&
            file.uid &&
            `https://static.guorou.net/${DIR_PATH}/${getFileName(file.name, file.uid)}`,
        };
        onOriginChange && onOriginChange({ ...params, fileList: [_file] });
        if (file.status === 'done') {
          onChange(_file);
        }
      }
    }
  };

  // let imgUrl;
  // if (!multiple) {
  //   imgUrl = value;
  // } else {
  //   // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  //   imgUrl === (value as any)?.[0]?.url;
  // }

  return (
    <div>
      <Upload.Dragger
        action={ossPath}
        data={getData}
        {...extraProps}
        onChange={handleChange}
        beforeUpload={handleBeforeUpload}
      >
        {props.children}
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
