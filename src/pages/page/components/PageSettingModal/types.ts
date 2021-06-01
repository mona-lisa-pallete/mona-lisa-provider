export interface PageSettingModalProps {
  visible: boolean;
  onChangeVisible: (val: boolean) => void;
  id: string | number;
  beforeSave?: () => PromiseLike<string>;
  onlineVal?: boolean;
}
