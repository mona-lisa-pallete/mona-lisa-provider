import React from 'react';
import { useModel } from 'umi';
import MaterialLibrary from '@/components/MaterialLibrary/';

const MaterialLibraryContainer: React.FC = () => {
  const { materialVisible, materialType, setMaterialVisible, setSelectData, extraData } = useModel(
    'useMaterialModel',
  );

  return (
    <MaterialLibrary
      visible={materialVisible}
      type={materialType}
      onSelect={(i) => {
        setSelectData({
          url: i.ossUrl,
          name: i.materialName,
          width: i.contentWidth,
          height: i.contentHeight,
        });
      }}
      extra={extraData}
      onClose={() => {
        setMaterialVisible(false);
      }}
    />
  );
};

export default MaterialLibraryContainer;
