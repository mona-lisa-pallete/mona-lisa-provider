import React from 'react';
import { useModel } from 'umi';
import MaterialLibrary from '@/components/MaterialLibrary/';

const MaterialLibraryContainer: React.FC = () => {
  const { materialVisible, materialType, setMaterialVisible, setSelectData, extraData } = useModel(
    'useMaterialModel',
  );
  // const location = useLocation();
  // console.log(location);

  // useHideHeader(location);

  console.log(materialType);

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
          size: i.contentLength,
          contentMd5: i.contentMd5,
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
