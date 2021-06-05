import { UploadFile } from 'antd/lib/upload/interface';
import React, { ReactNode } from 'react';

export interface PlatformUploadToolProps {
  onSelected: (data: Array<UploadFile<any>> | { url: string }) => void;
  resizeStyle: boolean;
  value: string;
  uploadText?: ReactNode | React.Component;
  uploadContent?: ReactNode | React.Component;
  accept?: string;
  onProgress: () => void;
  multiple?: boolean;
}
