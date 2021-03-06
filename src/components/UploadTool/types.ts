import { UploadFile } from 'antd/lib/upload/interface';
import React, { ReactNode } from 'react';

export interface UploadToolProps {
  value?: string;
  onChange?: (val: Array<UploadFile<any>> | string) => void;
  onSelectMaterial: () => void;
  onChangeFile?: (file: UploadFile<any>) => void;
  uploadText?: ReactNode | React.Component;
  uploadContent?: ReactNode | React.Component;
  accept?: string;
  onProgress?: (list: Array<UploadFile<any>> | UploadFile<any>) => void;
  multiple?: boolean;
}
