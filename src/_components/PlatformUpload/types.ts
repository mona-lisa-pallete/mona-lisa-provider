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
  name: string;
}
