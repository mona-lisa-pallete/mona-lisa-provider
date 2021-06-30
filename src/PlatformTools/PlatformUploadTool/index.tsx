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
import { convertFileToMaterial, getFileType, getImageSize, isPic } from '@/utils/common';
import EditorContext from '@/pages/editor/context';
import { UploadFile } from 'antd/lib/upload/interface';
import { ActionType, DSL, DSLContent } from '@/pages/editor/types';
import { MaterialType } from '@/pages/material-manage/types';
import { merge } from 'lodash';

const PlatformUploadTool = (props: PlatformUploadToolProps, ref: any) => {
  const {
    onSelected = () => {},
    uploadContent,
    uploadText,
    accept,
    onProgress,
    multiple,
    onSelectedMaterial,
    materialType = MaterialType.Image,
    onChangeFormatter,
    value,
    ...extraProps
  } = props;
  const { setMaterialVisible, setMaterialType } = useModel('useMaterialModel');
  const { selectMaterial, isSuccess } = useSelectMaterial();
  const [urlVal, setUrlVal] = useState('');
  const { state, dispatch, resizeContainerFn } = useContext(EditorContext);

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

      // if (selectMaterialData.width < 750) {
      //   selectMaterialData.width /= 2;
      //   selectMaterialData.height /= 2;
      // }

      let imgWidth: any;
      let imgHeight: any;
      if (selectMaterialData.width < 750) {
        imgWidth = selectMaterialData.width / 2;
        imgHeight = selectMaterialData.height / 2;
      } else {
        imgWidth = '100%';
        // imgHeight = '100%';
      }
      const content = changeElementStyle(state.dsl.content, state.selectedElementId!, {
        height: imgHeight,
        width: imgWidth,
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
      onSelectedMaterial(selectMaterial);
      resizeContainerFn();
      // setTimeout(() => {
      //   resizeContainerFn();
      // }, 1000);
    }
  }, [selectMaterial?.url, isSuccess]);

  useEffect(() => {
    setImgUrl();
  }, [setImgUrl]);

  const cusValue = useMemo(() => {
    return urlVal;
  }, [urlVal]);

  const changeElementStyle = (
    content: DSL['content'],
    id: string,
    style: CSSProperties,
  ): DSLContent[] | undefined => {
    const list = content.map((i) => {
      if (i.contentChild && i.contentChild.length && state.selectedContainerId === i.elementId) {
        i.contentChild.forEach((childItem, index) => {
          if (id === childItem.elementId) {
            i.contentChild![index].contentProp.style = merge(
              i.contentChild![index].contentProp.style,
              style,
            );
          }
        });
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

      let imgWidth: any;
      let imgHeight: any;
      if (width < 750) {
        imgWidth = width / 2;
        imgHeight = height / 2;
      } else {
        imgWidth = '100%';
        // imgHeight = '100%';
      }
      const content = changeElementStyle(state.dsl.content, state.selectedElementId!, {
        height: imgHeight,
        width: imgWidth,
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
      resizeContainerFn();
      // setTimeout(() => {
      //   resizeContainerFn();
      // }, 1000);
    }
  };

  return (
    <UploadTool
      onSelectMaterial={() => {
        setMaterialType(materialType);
        setMaterialVisible(true);
      }}
      uploadContent={uploadContent}
      accept={accept}
      uploadText={uploadText}
      onChange={(url) => {
        if (multiple) {
          const materials = (url as Array<UploadFile<any>>).map((i) => {
            const fileType = getFileType(i.url!);
            const materialTypeName = convertFileToMaterial(fileType);
            return {
              ossUrl: i.url!,
              materialType: materialTypeName,
            };
          });
          dispatch({
            type: ActionType.SetMaterials,
            payload: {
              materials: [...state.materials, ...materials],
            },
          });
          onSelected(url as Array<UploadFile<any>>);
        } else {
          const fileType = getFileType(url as string);
          const materialTypeName = convertFileToMaterial(fileType);
          dispatch({
            type: ActionType.SetMaterials,
            payload: {
              materials: [
                ...state.materials,
                {
                  ossUrl: url as string,
                  materialType: materialTypeName,
                },
              ],
            },
          });
          onSelected({ url: url as string });
          setUrlVal(url as string);
        }
      }}
      multiple={multiple}
      onChangeFile={handleElementStyle}
      onProgress={onProgress}
      {...extraProps}
      value={cusValue || value}
    />
  );
};

export default forwardRef(PlatformUploadTool);
