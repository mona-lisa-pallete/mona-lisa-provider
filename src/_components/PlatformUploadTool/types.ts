import React, { ReactNode } from 'react';

export interface PlatformUploadToolProps {
  onSelected: (data: Array<{ url: string }>) => void;
  resizeStyle: boolean;
  value: string;
  uploadText?: ReactNode | React.Component;
  uploadContent?: ReactNode | React.Component;
  accept?: string;
  onProgress: () => void;
}
