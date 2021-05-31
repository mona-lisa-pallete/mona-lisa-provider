import React from 'react';
import { useModel } from 'umi';
import MaterialLibrary from '@/components/MaterialLibrary/';

const MaterialLibraryContainer: React.FC = () => {
  const { materialVisible, materialType, setMaterialVisible, setSelectData } = useModel(
    'useMaterialModel',
  );

  return (
    <MaterialLibrary
      visible={materialVisible}
      type={materialType}
      onSelect={(url: string, name: string) => {
        setSelectData({
          url,
          name,
        });
      }}
      onClose={() => {
        setMaterialVisible(false);
      }}
    />
  );
};

export default MaterialLibraryContainer;
