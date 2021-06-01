import { UploadFile } from 'antd/lib/upload/interface';

export interface UploadToolProps {
  value?: string;
  onChange?: (val: string) => void;
  onSelectMaterial: () => void;
  onChangeFile?: (file: UploadFile<any>) => void;
}
