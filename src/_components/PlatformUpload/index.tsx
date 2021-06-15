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
import { RcFile, UploadFile } from 'antd/lib/upload/interface';
import {
  convertFileToMaterial,
  getFileType,
  getImageSize,
  isImgSize,
  isMp4,
  isPicGif,
  isVideoSize,
} from '@/utils/common';
import EditorContext from '@/pages/editor/context';
import { ActionType } from '@/pages/editor/types';
import { DraggerProps } from 'antd/lib/upload';
import { useSelectMaterial } from '@/hooks/material';
import FileContent from './FileContent';
import { MIME } from '@/pages/material-manage/components/File/types';
import { message } from 'antd';

const UploadContentRenderMap = new Map<PlatformUploadFile, React.FC>([
  [PlatformUploadFile.Image, ImageContent],
  [PlatformUploadFile.Video, VideoContent],
  [PlatformUploadFile.File, FileContent],
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
  [
    PlatformUploadFile.File,
    {
      showUploadList: true,
      multiple: true,
      accept: '.pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx',
    },
  ],
]);

const PlatformUpload: React.FC<PlatformUploadProps> = (props) => {
  const { setMaterialVisible, setMaterialType } = useModel('useMaterialModel');
  const { type = PlatformUploadFile.Image, onChange, value, name, ...extraProps } = props;
  const [uploadVal, setUploadVal] = useState<any>(value);
  const { state, dispatch } = useContext(EditorContext);
  const { selectMaterial, isSuccess } = useSelectMaterial();
  const nameRef = useRef<string>('');

  const UploadText = UploadContentRenderText.get(type);
  const UploadProps = UploadContentProps.get(type);
  const { multiple } = UploadProps || {};
  const [fileList, setFileList] = useState<UploadFile[]>(() => {
    return multiple
      ? value
      : value && [
          {
            name: '',
            uid: 1,
            url: value,
          },
        ];
  }); // 为了接入素材库，变非受控为受控组件
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
        case PlatformUploadFile.File:
          const newItem = {
            url: selectMaterialData.url,
            name: selectMaterialData.name,
            size: selectMaterialData.size,
            uid: selectMaterialData.url.match(/assets\/(.*)\..*/)?.[1],
          };
          const list = [...(value || []), newItem];
          onChange && onChange(list);
          setFileList(list);
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
      onChange && onChange(file);
      setUploadVal(file);
    } else {
      const { url, status } = file as UploadFile<any>;
      if (status !== 'done') {
        // 上传完成前，视频首帧或图片实际还未有对应资源
        return;
      }
      const fileType = getFileType(url!);
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
      onChange && onChange(url);
      setUploadVal(url);
    }
  };

  const validateImg = async (file: RcFile, gifCheck?: boolean) => {
    const types = ['image/png', 'image/jpeg'];
    if (gifCheck) {
      types.push('image/gif');
    }
    if (!isPicGif(file.name)) {
      message.error({
        content: '图片格式支持jpg、png',
        style: {
          marginTop: '210px',
        },
      });
      return Promise.reject();
    }
    if (!isImgSize(file.size)) {
      message.error({
        content: '图片最大为1m',
        style: {
          marginTop: '210px',
        },
      });
      return Promise.reject();
    }
    return Promise.resolve();
  };

  const validateVideo = async (file: RcFile) => {
    if (!isMp4(file.name)) {
      message.error({
        content: '视频格式支持mp4',
        style: {
          marginTop: '210px',
        },
      });
      return Promise.reject();
    }
    if (!isVideoSize(file.size)) {
      message.error({
        content: '视频最大为1024m',
        style: {
          marginTop: '210px',
        },
      });
      return Promise.reject();
    }
    return Promise.resolve();
  };

  const handleBeforeUpload = async (file: RcFile) => {
    const imgTypes = ['.png', '.jpeg', '.jpg', '.gif'];
    const videoTypes = ['.mp4'];
    const fileTypes = Object.keys(MIME).map((i) => `.${i}`);
    if (imgTypes.includes(getFileType(file.name))) {
      await validateImg(file, true);
    } else if (videoTypes.includes(getFileType(file.name))) {
      await validateVideo(file);
    } else if (fileTypes.includes(getFileType(file.name))) {
      //
    } else {
      message.warning({
        content: '只支持.jpg / .png / .mp4 / 文档类型',
        style: {
          marginTop: '210px',
        },
      });
      return Promise.reject();
    }
    return Promise.resolve();
  };

  return (
    <UploadTool
      fileList={fileList}
      onSelectMaterial={() => {
        nameRef.current = name;
        setMaterialType(materialType);
        setMaterialVisible(true);
      }}
      {...UploadProps}
      onOriginChange={({ fileList: list }) => {
        setFileList(list);
      }}
      onChange={handleChange}
      {...extraProps}
      beforeUpload={handleBeforeUpload}
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
