import { RcFile, UploadFile } from 'antd/lib/upload/interface';

export interface UploadToolProps {
  value?: string;
  onChange?: (val: Array<UploadFile<any>> | UploadFile<any>) => void;
  onSelectMaterial: () => void;
  onProgress?: (list: Array<UploadFile<any>> | UploadFile<any>) => void;
  multiple?: boolean;
  beforeUpload?: (file: RcFile, FileList: RcFile[]) => PromiseLike<void>;
}
