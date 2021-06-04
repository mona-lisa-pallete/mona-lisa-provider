import React, {
  CSSProperties,
  useContext,
  useEffect,
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import UploadTool from '@/components/UploadTool/';
import { PlatformUploadToolProps } from './types';
import { useModel } from 'umi';
import { useSelectMaterial } from '@/hooks/material';
import { getImageSize, isPic } from '@/utils/common';
import EditorContext from '@/pages/editor/context';
import { UploadFile } from 'antd/lib/upload/interface';
import { ActionType, DSL, DSLContent } from '@/pages/editor/types';

const PlatformUploadTool = (props: PlatformUploadToolProps, ref: any) => {
  const { onSelected, uploadContent, uploadText } = props;
  const { setMaterialVisible } = useModel('useMaterialModel');
  const { selectMaterial, isSuccess } = useSelectMaterial();
  const [urlVal, setUrlVal] = useState('');
  const { state, dispatch } = useContext(EditorContext);

  useImperativeHandle(ref, () => {
    return {
      setUrlVal(url: string) {
        setUrlVal(url);
      },
    };
  });

  const setImgUrl = useCallback(() => {
    if (isSuccess && selectMaterial) {
      const selectMaterialData = { ...selectMaterial };

      if (selectMaterialData.width < 750) {
        console.log(selectMaterialData.width, 'selectMaterialData.width');
        selectMaterialData.width /= 2;
        selectMaterialData.height /= 2;
      }
      const content = changeElementStyle(state.dsl.content, state.selectedElementId!, {
        height: selectMaterialData.height / 2,
        width: selectMaterialData.width / 2,
      })!;
      dispatch({
        type: ActionType.UpdateComponent,
        payload: {
          dsl: {
            ...state.dsl,
            content,
          },
        },
      });
      setUrlVal(selectMaterial.url);
      onSelected(selectMaterial);
    }
  }, [selectMaterial?.url, isSuccess]);

  useEffect(() => {
    setImgUrl();
  }, [setImgUrl]);

  const value = useMemo(() => {
    return urlVal;
  }, [urlVal]);

  const changeElementStyle = (
    content: DSL['content'],
    id: string,
    style: CSSProperties,
  ): DSLContent[] | undefined => {
    const list = content.map((i) => {
      if (i.contentChild && i.contentChild.length && state.selectedContainerId === i.elementId) {
        let contentChild: DSLContent[] = [];
        i.contentChild.forEach((childItem, index) => {
          contentChild = i.contentChild!;
          if (id === childItem.elementId) {
            i.contentChild![index].contentProp.style = style;
          }
        });

        if (contentChild) {
          let maxHeightItem: DSLContent = {};
          let maxH = 0;
          contentChild.forEach((contentChildItem: DSLContent) => {
            if (contentChildItem!.contentProp?.style?.height > maxH) {
              maxHeightItem = contentChildItem;
              maxH = (contentChildItem?.contentProp?.style?.height as number) || 0;
            }
          });
          let height = maxHeightItem?.contentProp?.style?.height;
          if (maxHeightItem && maxHeightItem?.contentProp?.style?.width >= 750) {
            const radio = maxHeightItem?.contentProp?.style?.width / 750;
            height /= radio;
            // height /= 2;
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
      let { height, width } = await getImageSize(img);

      if (width < 750) {
        width /= 2;
        height /= 2;
      }
      const content = changeElementStyle(state.dsl.content, state.selectedElementId!, {
        height,
        width,
      })!;
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
      uploadContent={uploadContent}
      uploadText={uploadText}
      onChange={(url) => {
        setUrlVal(url);
        onSelected({ url });
      }}
      onChangeFile={handleElementStyle}
      value={value}
    />
  );
};

export default forwardRef(PlatformUploadTool);
