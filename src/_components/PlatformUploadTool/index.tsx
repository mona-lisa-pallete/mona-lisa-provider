import React, { CSSProperties, useContext, useEffect, useMemo, useState } from 'react';
import UploadTool from '@/components/UploadTool/';
import { PlatformUploadToolProps } from './types';
import { useModel } from 'umi';
import { useSelectMaterial } from '@/hooks/material';
import { getImageSize, isPic } from '@/utils/common';
import EditorContext from '@/pages/editor/context';
import { UploadFile } from 'antd/lib/upload/interface';
import { ActionType, DSL, DSLContent } from '@/pages/editor/types';

const PlatformUploadTool: React.FC<PlatformUploadToolProps> = (props) => {
  const { onSelected } = props;
  const { setMaterialVisible } = useModel('useMaterialModel');
  const { selectMaterial, isSuccess } = useSelectMaterial();
  const [urlVal, setUrlVal] = useState('');
  const { state, dispatch } = useContext(EditorContext);

  useEffect(() => {
    if (isSuccess && selectMaterial) {
      setUrlVal(selectMaterial.url);
      onSelected(selectMaterial);
    }
  }, [selectMaterial, isSuccess]);

  const value = useMemo(() => {
    return urlVal;
  }, [urlVal]);

  const changeElementStyle = (
    content: DSL['content'],
    id: string,
    style: CSSProperties,
  ): DSLContent[] | undefined => {
    const list = content.map((i) => {
      if (i.contentChild && i.contentChild.length) {
        let contentChild: DSLContent[] = [];
        i.contentChild.forEach((childItem, index) => {
          contentChild = i.contentChild!;
          if (id === childItem.elementId) {
            i.contentChild![index].contentProp.style = style;
          }
        });
        if (contentChild) {
          let maxHeightItem;
          let maxH = 0;
          contentChild.forEach((contentChildItem) => {
            if (contentChildItem?.contentProp?.style?.height > maxH) {
              maxHeightItem = contentChildItem;
              maxH = contentChildItem.contentProp.style?.height;
            }
          });
          let height = maxHeightItem?.contentProp?.style?.height;
          if (maxHeightItem?.contentProp?.style?.width > 750) {
            const radio = maxHeightItem?.contentProp?.style?.width / 750;
            height /= radio;
            console.log(height);
          }
          i.contentProp.style = {
            ...i.contentProp.style,
            height,
          };
        }
      }
      return i!;
    });
    return list!;
  };

  const handleElementStyle = async (file: UploadFile<any>) => {
    const isPicVal = isPic(file.name);
    if (isPicVal) {
      const img = new Image(); // 手动创建一个Image对象
      const url = window.URL || window.webkitURL;
      img.src = url.createObjectURL(file.originFileObj); // 创建Image的对象的url
      const { height, width } = await getImageSize(img);
      console.log(height, width);

      const content = changeElementStyle(state.dsl.content, state.selectedElementId!, {
        height: height / 2,
        width: width / 2,
      });
      dispatch({
        type: ActionType.UpdateComponent,
        payload: {
          dsl: {
            ...state.dsl,
            content,
          },
        },
      });
    }
  };

  return (
    <UploadTool
      onSelectMaterial={() => {
        setMaterialVisible(true);
      }}
      onChange={(url) => {
        setUrlVal(url);
        onSelected({ url });
      }}
      onChangeFile={handleElementStyle}
      value={value}
    />
  );
};

export default PlatformUploadTool;
