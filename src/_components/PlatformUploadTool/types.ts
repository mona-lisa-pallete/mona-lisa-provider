import React, { ReactNode } from 'react';

export interface PlatformUploadToolProps {
  onSelected: (data: { url: string }) => void;
  resizeStyle: boolean;
  value: string;
  uploadText?: ReactNode | React.Component;
  uploadContent?: ReactNode | React.Component;
}
