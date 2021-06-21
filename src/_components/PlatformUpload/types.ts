import { UploadFile } from 'antd/lib/upload/interface';

export enum PlatformUploadFile {
  Image = 'image',
  File = 'file',
  Video = 'video',
}
export interface PlatformUploadProps {
  type?: PlatformUploadFile;
  value?: any;
  onChange?: (data: any) => any;
  multiple?: boolean;
  onProgress?: (progressInfo: UploadFile) => void;
  name: string;
}
