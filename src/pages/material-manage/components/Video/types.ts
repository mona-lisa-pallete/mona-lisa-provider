import { MaterialType } from '../../types';

export interface VideoMaterialProps {
  onPreview: (
    selectedIndex: number,
    data: Array<{ url: string; type: MaterialType; id: number }>,
    visible: boolean,
  ) => void;
  onChangeName: (name: string, id: number) => void;
  onDelMaterial: (id: number | string) => void;
}

export interface VideoRef {
  getVideoData: () => () => void;
}
