import { getUploadPolicy } from '@/services/common';
import { Upload } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import React, { useState } from 'react';
import { UploadToolProps } from './types';

const DIR_PATH = 'kbase/davinciprovider/assets';

const ossPath = 'https://static-zy-com.oss-cn-hangzhou.aliyuncs.com/';

const getFileName = (fileName: string, uid: string) => {
  return `${uid}${/(\..+)$/.exec(fileName)![0]}`;
};

const UploadTool: React.FC<UploadToolProps> = (props) => {
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

  const handleChange = ({ file, fileList }: UploadChangeParam<UploadFile<any>>) => {
    const files = fileList.map((e) => {
      return {
        ...e,
        url:
          e.status === 'done'
            ? `https://static.guorou.net/${DIR_PATH}/${getFileName(e.name, e.uid)}`
            : '',
      };
    });
    if (file.status === 'done') {
      console.log(files);
    }
  };

  return (
    <Upload.Dragger
      onChange={handleChange}
      action={ossPath}
      data={getData}
      showUploadList={false}
      beforeUpload={handleBeforeUpload}
    >
      {props.children}
    </Upload.Dragger>
  );
};
export default UploadTool;
