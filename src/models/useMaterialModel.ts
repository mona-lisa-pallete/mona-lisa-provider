import { MaterialType } from '@/pages/material-manage/types';
import { useState, useEffect } from 'react';

export default function useMaterialModel() {
  const [materialVisible, setMaterialVisible] = useState(false);
  const [materialType, setMaterialType] = useState(MaterialType.Image);
  const [selectedData, setSelectData] = useState<{ url: string; name: string }>();

  useEffect(() => {
    if (!materialVisible) {
      setSelectData({
        url: '',
        name: '',
      });
    }
  }, [materialVisible]);

  return {
    materialVisible,
    setMaterialVisible,
    materialType,
    setMaterialType,
    selectedData,
    setSelectData,
  };
}
