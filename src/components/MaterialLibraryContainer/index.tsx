import React, { useEffect } from 'react';
import { useModel } from 'umi';
import MaterialLibrary from '@/components/MaterialLibrary/';

const MaterialLibraryContainer: React.FC = () => {
  const { materialVisible, materialType, setMaterialVisible, setSelectData } = useModel(
    'useMaterialModel',
  );
  useEffect(() => {
    // console.log(222222, 'materialVisible');
    console.log(2222222222);
  }, []);

  return (
    <MaterialLibrary
      visible={materialVisible}
      type={materialType}
      onSelect={(url: string, name: string) => {
        setSelectData({
          url,
          name,
        });
        setMaterialVisible(false);
      }}
      onClose={() => {
        console.log(111111);
        setMaterialVisible(false);
      }}
    />
  );
};

export default MaterialLibraryContainer;
