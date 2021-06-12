/* eslint-disable no-case-declarations */
import UploadTool from '@/_components/UploadTool/';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { PlatformUploadFile, PlatformUploadProps } from './types';
import { useModel } from 'umi';
import { MaterialType } from '@/pages/material-manage/types';
import ImageContent from './ImageContent';
import VideoContent from './VideoContent';
import { UploadButton } from '../UploadTool/index.style';
import { PlusOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';
import { convertFileToMaterial, getFileType, getImageSize } from '@/utils/common';
import EditorContext from '@/pages/editor/context';
import { ActionType } from '@/pages/editor/types';
import { DraggerProps } from 'antd/lib/upload';
import { useSelectMaterial } from '@/hooks/material';

const UploadContentRenderMap = new Map<PlatformUploadFile, React.FC>([
  [PlatformUploadFile.Image, ImageContent],
  [PlatformUploadFile.Video, VideoContent],
]);

const UploadContentRenderText = new Map<PlatformUploadFile, string>([
  [PlatformUploadFile.Image, '上传图片'],
  [PlatformUploadFile.Video, '上传视频'],
]);

const UploadContentProps = new Map<PlatformUploadFile, DraggerProps>([
  [
    PlatformUploadFile.Image,
    {
      showUploadList: false,
      multiple: false,
      accept: 'image/png,image/jpeg,image/gif',
    },
  ],
  [
    PlatformUploadFile.Video,
    {
      showUploadList: false,
      multiple: false,
      accept: 'video/mp4',
    },
  ],
]);

const PlatformUpload: React.FC<PlatformUploadProps> = (props) => {
  const { setMaterialVisible, setMaterialType } = useModel('useMaterialModel');
  const { type = PlatformUploadFile.Image, multiple = false, onChange, value, name } = props;
  const [uploadVal, setUploadVal] = useState<any>(value);
  const { state, dispatch } = useContext(EditorContext);
  const { selectMaterial, isSuccess } = useSelectMaterial();
  const nameRef = useRef<string>('');

  const changeImgSize = (height: number, width: number) => {
    return () => {
      let imgWidth: any;
      let imgHeight: any;
      if (width < 750) {
        imgWidth = width / 2;
        imgHeight = height / 2;
      } else {
        imgWidth = '100%';
        imgHeight = 'auto';
      }
      return {
        height: imgHeight,
        width: imgWidth,
      };
    };
  };

  const setImgUrl = useCallback(() => {
    if (isSuccess && selectMaterial) {
      if (nameRef.current !== name) {
        return;
      }
      const selectMaterialData = { ...selectMaterial };

      if (type === PlatformUploadFile.Image) {
        const getImgSize = changeImgSize(selectMaterialData.height, selectMaterialData.width);
        dispatch({
          type: ActionType.ChangeElementStyle,
          payload: {
            data: getImgSize(),
          },
        });
      }

      switch (type) {
        case PlatformUploadFile.Image:
        case PlatformUploadFile.Video:
          onChange && onChange(selectMaterialData.url);
          break;
        default:
          break;
      }
      nameRef.current = '';
    }
  }, [selectMaterial?.url, isSuccess]);

  useEffect(() => {
    setImgUrl();
  }, [setImgUrl]);

  useEffect(() => {
    setUploadVal(value);
  }, [value]);

  const materialType = useMemo(() => {
    let material;
    switch (type) {
      case PlatformUploadFile.Image:
        material = MaterialType.Image;
        break;
      case PlatformUploadFile.Video:
        material = MaterialType.Video;
        break;
      case PlatformUploadFile.File:
        material = MaterialType.File;
        break;
      default:
        material = MaterialType.Image;
        break;
    }

    return material;
  }, [type]);

  const UploadContent = UploadContentRenderMap.get(type) as React.FC<{
    onChange: (data: any) => void;
    value: any;
  }>;

  const handleChange = async (file: UploadFile<any> | Array<UploadFile<any>>) => {
    switch (type) {
      case PlatformUploadFile.Image:
        const img = new Image(); // 手动创建一个Image对象
        const url = window.URL || window.webkitURL;
        img.src = url.createObjectURL((file as any).originFileObj); // 创建Image的对象的url
        const { height, width } = await getImageSize(img);
        const getImgSize = changeImgSize(height, width);
        dispatch({
          type: ActionType.ChangeElementStyle,
          payload: {
            data: getImgSize(),
          },
        });
        break;
      default:
        break;
    }
    if (multiple) {
      const materials = (file as Array<UploadFile<any>>).map((i) => {
        const fileType = getFileType(i.url!);
        const materialTypeName = convertFileToMaterial(fileType);
        return {
          ossUrl: i.url!,
          materialType: materialTypeName as MaterialType,
        };
      });
      dispatch({
        type: ActionType.SetMaterials,
        payload: {
          materials: [...state.materials, ...materials],
        },
      });
    } else {
      const url = (file as UploadFile<any>).url!;
      const fileType = getFileType(url);
      const materialTypeName = convertFileToMaterial(fileType) as MaterialType;
      dispatch({
        type: ActionType.SetMaterials,
        payload: {
          materials: [
            ...state.materials,
            {
              ossUrl: url,
              materialType: materialTypeName,
            },
          ],
        },
      });
      setTimeout(() => {
        onChange && onChange(url);
        setUploadVal(url);
      }, 200);
    }
  };

  const UploadProps = UploadContentProps.get(type);
  const UploadText = UploadContentRenderText.get(type);

  return (
    <UploadTool
      onSelectMaterial={() => {
        nameRef.current = name;
        setMaterialType(materialType);
        setMaterialVisible(true);
      }}
      {...UploadProps}
      onChange={handleChange}
    >
      {!uploadVal && (
        <UploadButton>
          <PlusOutlined style={{ color: '#8E91A3', fontSize: '20px', marginBottom: '6px' }} />
          {UploadText}
        </UploadButton>
      )}
      {uploadVal && (
        <UploadContent
          value={uploadVal}
          onChange={(data: any) => {
            onChange && onChange(data);
          }}
        />
      )}
    </UploadTool>
  );
};

export default PlatformUpload;
