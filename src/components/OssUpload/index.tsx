import React, { useState } from 'react';
import { Upload } from 'antd';
import { getUploadPolicy } from '@/services/common/index';
import { UploadFile } from 'antd/lib/upload/interface';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';

const { Dragger } = Upload;
/**
 * 不要随意更改上传的目录！
 * 由于 chrome 下不能正常播放非 h264 编码的视频（会黑屏）, 所以此目录下做了自动转码为 h264 的工作
 * 阿里云转码服务：https://mps.console.aliyun.com/workflow/list
 * 工作流id：e441c7da954d425aa83224a1b74ec6b1
 */
const DIR_PATH = 'kbase/portallandingpage/assets';

const ossPath = 'https://static-zy-com.oss-cn-hangzhou.aliyuncs.com/';

const getFileName = (fileName: string, uid: string) => {
  return `${uid}${/(\..+)$/.exec(fileName)![0]}`;
};

enum Accept {
  'img' = 'image/png,image/jpeg',
  'video' = 'audio/mp4,video/mp4',
  'imgVideo' = 'image/png,image/jpeg,audio/mp4,video/mp4',
  'imgVideoFile' = 'image/png,image/jpeg,audio/mp4,video/mp4,application/pdf,application/vnd.ms-powerpoint,application/vnd.ms-excel,application/msword',
}

interface UploadToolProps {
  type?: 'img' | 'video' | 'imgVideo' | 'imgVideoFile';
  onChange: (file: UploadFile<any>, fileList?: UploadFile[]) => void;
  beforeUpload?: (file: RcFile, FileList: RcFile[]) => PromiseLike<void>;
  cRef?: any;
  className?: string;
  onPreview?: (list: any[]) => void;
  multiple?: boolean;
}

const UploadTool: React.FC<UploadToolProps> = (props) => {
  const { onChange, beforeUpload, className, multiple } = props;
  const [policy, setPolicy] = useState<any>({});
  const accept = Accept[props.type || 'img'];

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
  const getData = (file: UploadFile<any>) => {
    return {
      ...policy,
      key: `${DIR_PATH}/${getFileName(file.name, file.uid)}`,
    };
  };
  const handleChange = ({ file, fileList }: UploadChangeParam<UploadFile<any>>) => {
    if (file.status === 'done') {
      file.url = `${ossPath}${DIR_PATH}/${getFileName(file.name, file.uid)}`;
    }
    onChange(file, fileList);
  };

  return (
    <Dragger
      action={ossPath}
      data={getData}
      showUploadList={false}
      onChange={handleChange}
      beforeUpload={handleBeforeUpload}
      className={className}
      accept={accept}
      multiple={multiple}
    >
      {props.children}
    </Dragger>
  );
};
export default UploadTool;
