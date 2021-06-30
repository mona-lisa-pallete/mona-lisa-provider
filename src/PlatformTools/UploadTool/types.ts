import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';

export interface UploadToolProps {
  value?: string;
  onChange?: (val: Array<UploadFile<any>> | UploadFile<any>) => void;
  onOriginChange?: (info: UploadChangeParam) => void;
  fileList: UploadFile[];
  onSelectMaterial: () => void;
  onProgress?: (progressInfo: UploadFile) => void;
  multiple?: boolean;
  beforeUpload?: (file: RcFile, FileList: RcFile[]) => PromiseLike<void>;
}
