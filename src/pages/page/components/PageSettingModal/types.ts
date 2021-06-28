export interface PageSettingModalProps {
  visible: boolean;
  onChangeVisible: (val: boolean) => void;
  id: string | number;
  beforeSave?: (title?: string) => PromiseLike<string>;
  onlineVal?: boolean;
}
