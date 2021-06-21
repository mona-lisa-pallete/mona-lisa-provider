import { Material } from '@/models/useMaterialModel';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';

export const useSelectMaterial = () => {
  const { selectedData, materialVisible, setSelectData, setMaterialVisible } = useModel(
    'useMaterialModel',
  );
  const [selectMaterial, setSelectMaterial] = useState<Material>();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!materialVisible && selectedData) {
      setSelectData(undefined);
      setMaterialVisible(false);
      setSelectMaterial(selectedData);
      setIsSuccess(true);
    }
  }, [materialVisible, selectedData, setMaterialVisible, setSelectData]);

  useEffect(() => {
    if (!materialVisible) {
      let timeoutKey: any = setTimeout(() => {
        setIsSuccess(false);
        timeoutKey = null;
      }, 100);
      return () => {
        if (timeoutKey) clearTimeout(timeoutKey);
      };
    }
  }, [materialVisible]);

  return { selectMaterial, isSuccess };
};
