import { MaterialType } from '@/pages/material-manage/types';
import { useState } from 'react';

interface Material {
  url: string;
  name: string;
}

export default function useMaterialModel() {
  const [materialVisible, setMaterialVisible] = useState(false);
  const [materialType, setMaterialType] = useState(MaterialType.Image);
  const [selectedData, setSelectData] = useState<Material>();

  return {
    materialVisible,
    setMaterialVisible,
    materialType,
    setMaterialType,
    selectedData,
    setSelectData,
  };
}

export { Material };
