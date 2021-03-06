import { Material } from '@/models/useMaterialModel';
import { MaterialType } from '@/pages/material-manage/types';
import { UploadFile } from 'antd/lib/upload/interface';
import React, { ReactNode } from 'react';

export interface PlatformUploadToolProps {
  onSelected: (data: Array<UploadFile<any>> | { url: string }) => void;
  resizeStyle: boolean;
  value: string;
  uploadText?: ReactNode | React.Component;
  uploadContent?: ReactNode | React.Component;
  onChange?: (_: any) => void;
  onChangeFormatter?: (_: any) => any;
  accept?: string;
  onProgress: () => void;
  multiple?: boolean;
  onSelectedMaterial: (material: Material) => void;
  materialType: MaterialType;
}
