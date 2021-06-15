import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';

export interface UploadToolProps {
  value?: string;
  onChange?: (val: Array<UploadFile<any>> | UploadFile<any>) => void;
  onOriginChange?: (info: UploadChangeParam) => void;
  fileList: UploadFile[];
  onSelectMaterial: () => void;
  onProgress?: (list: Array<UploadFile<any>> | UploadFile<any>) => void;
  multiple?: boolean;
  beforeUpload?: (file: RcFile, FileList: RcFile[]) => PromiseLike<void>;
}
