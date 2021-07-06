import React, { useState, useEffect, useRef } from 'react';
import { MaterialManageContainer } from './index.style';
import {
  Tabs,
  Button,
  Input,
  Modal,
  message,
  Form,
  PageHeader as AntdPageHeader,
  Menu,
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { setMaterial, delMaterial } from '@/services/material/';
import Viewer from '@/components/Viewer/';
import { ViewerItem } from '@/components/Viewer/types';
import { MaterialType } from './types';
// import { getUser } from '@/services/common';
// import { UserRequestType } from '@/services/common/schema';
import { useModel, useLocation, Link } from 'umi';
import { MessageType } from '@/utils/message';
import Picture from './components/Picture/';
import Video from './components/Video/';
import { PictureRef as PictureRefType } from './components/picture/types';
import { VideoRef as VideoRefType } from './components/Video/types';
import { FileRef as FileRefType } from './components/File/types';
import File from './components/File/';
import { useHideHeader } from '../editor/hooks';

const { TabPane } = Tabs;

const { confirm } = Modal;

const MaterialManage: React.FC = () => {
  const [queryForm] = Form.useForm();
  const { setUploadNewWindow } = useModel('useCommonModel');
  // const { userInfo } = useModel('useUserModel');
  const [viewData, setViewData] = useState<ViewerItem[]>([]);
  const [viewerVisible, setViewerVisible] = useState(false);
  const [viewerSelected, setViewerSelected] = useState(0);
  const [materialModelVisible, setMaterialModelVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [materialName, setMaterialName] = useState('');
  const [materialId, setMaterialId] = useState<number>();
  const viewerRef = useRef<any>();
  const [editMaterialType, setEditMaterialType] = useState(MaterialType.Image);
  const PictureRef = useRef<PictureRefType>(null);
  const VideoRef = useRef<VideoRefType>(null);
  const FileRef = useRef<FileRefType>(null);

  const location: any = useLocation();
  useHideHeader(location);
  // const [userOption, setUserOption] = useState<Array<{ label: string; value: string | number }>>(
  //   [],
  // );

  useEffect(() => {
    const messageListener = (e: MessageEvent) => {
      if (e.data === MessageType.UploadSuccess) {
        queryForm.submit();
        // setImagePageNum(1);
        // setVideoPageNum(1);
      }
    };
    window.addEventListener('message', messageListener);
    // const getData = async () => {
    //   const res = await getUser({
    //     type: UserRequestType.Material,
    //   });
    //   if (res.code === 0) {
    //     const data = res.data
    //       .map((i) => {
    //         return {
    //           label: i.createUserName,
    //           value: i.createUserId,
    //         };
    //       })
    //       .filter((i) => i.value !== userInfo?.id);
    //     data.unshift({
    //       label: '我',
    //       value: userInfo!.id as number,
    //     });
    //     setUserOption(data);
    //   }
    // };
    // getData();
    return () => {
      window.removeEventListener('message', messageListener);
    };
  }, [queryForm]);

  // useEffect(() => {
  //   getImageData(true);
  // }, [getImageData]);

  // useEffect(() => {
  //   getVideoData(true);
  // }, [getVideoData]);

  const handleOk = async () => {
    if (!materialName.trim()) {
      message.warning('素材名称不能为空');
      return;
    }
    setConfirmLoading(true);
    const res = await setMaterial(materialId!, {
      // 简写会出错
      // eslint-disable-next-line object-shorthand
      materialName: materialName.trim(),
    });
    setConfirmLoading(false);
    setMaterialModelVisible(false);
    if (res.code === 0) {
      message.success('修改成功');
      switch (editMaterialType) {
        case MaterialType.Image:
          PictureRef.current!.getImageData()();
          break;
        case MaterialType.Video:
          VideoRef.current!.getVideoData()();
          break;
        case MaterialType.File:
          FileRef!.current!.reload()();
          break;
        default:
          break;
      }
    }
    if (viewerVisible) {
      viewerRef.current.fetchData();
    }
  };

  const handleCancel = () => {
    setConfirmLoading(false);
    setMaterialModelVisible(false);
  };

  const handleChangeName = (name: string, id: number, type: MaterialType) => {
    setMaterialName(name);
    setMaterialId(id);
    setEditMaterialType(type);
    setMaterialModelVisible(true);
  };

  const handleRemove = (id: string | number) => {
    return new Promise(() => {
      confirm({
        title: '提示',
        icon: <ExclamationCircleOutlined />,
        content: '删除之后暂时无法找回，是否确认删除？',
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        centered: true,
        async onOk() {
          await delMaterial(id);
        },
      });
    });
  };

  const handleViewer = (
    selectedIndex: number,
    data: Array<{ url: string; type: MaterialType; id: number }>,
    visible: boolean,
    type: MaterialType,
  ) => {
    setViewData(data);
    setViewerSelected(selectedIndex);
    setViewerVisible(visible);
    setEditMaterialType(type);
  };

  const handleDelMaterial = async (id: string | number) => {
    await delMaterial(id);
  };

  return (
    <>
      <AntdPageHeader title="达芬奇" className="page-header" />
      <div className="projects-container">
        <aside>
          <Menu selectedKeys={['2']}>
            <Menu.Item key={'1'}>
              <Link to="/project">落地页项目管理</Link>
            </Menu.Item>
            <Menu.Item key={'2'}>素材管理</Menu.Item>
          </Menu>
        </aside>
        <MaterialManageContainer>
          <div
            style={{
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                right: '16px',
                top: '5px',
                zIndex: 1,
              }}
            >
              <Button
                type="primary"
                onClick={() => {
                  setUploadNewWindow();
                }}
              >
                素材上传
              </Button>
            </div>
            <Tabs defaultActiveKey={MaterialType.Image}>
              <TabPane tab="图片" key={MaterialType.Image}>
                <Picture
                  onPreview={(
                    selectedIndex: number,
                    data: Array<{
                      url: string;
                      type: MaterialType;
                      id: number;
                    }>,
                    visible: boolean,
                  ) => {
                    handleViewer(selectedIndex, data, visible, MaterialType.Image);
                  }}
                  onChangeName={(name: string, id: number) => {
                    handleChangeName(name, id, MaterialType.Image);
                  }}
                  ref={PictureRef}
                  onDelMaterial={handleDelMaterial}
                />
              </TabPane>
              <TabPane tab="视频" key={MaterialType.Video}>
                <Video
                  onPreview={(
                    selectedIndex: number,
                    data: Array<{
                      url: string;
                      type: MaterialType;
                      id: number;
                    }>,
                    visible: boolean,
                  ) => {
                    handleViewer(selectedIndex, data, visible, MaterialType.Image);
                  }}
                  onChangeName={(name: string, id: number) => {
                    handleChangeName(name, id, MaterialType.Video);
                  }}
                  onDelMaterial={handleDelMaterial}
                  ref={VideoRef}
                />
              </TabPane>
              <TabPane tab="文档" key={MaterialType.File}>
                <File
                  onPreview={(
                    selectedIndex: number,
                    data: Array<{
                      url: string;
                      type: MaterialType;
                      id: number;
                    }>,
                    visible: boolean,
                  ) => {
                    handleViewer(selectedIndex, data, visible, MaterialType.File);
                  }}
                  onChangeName={(name: string, id: number) => {
                    handleChangeName(name, id, MaterialType.File);
                  }}
                  onDelMaterial={handleDelMaterial}
                  ref={FileRef}
                />
              </TabPane>
            </Tabs>
          </div>
          <Viewer
            onClose={() => {
              setViewerVisible(false);
            }}
            onChangeName={(name: string, id: number) => {
              handleChangeName(name, id, editMaterialType);
            }}
            viewerRef={viewerRef}
            selected={viewerSelected}
            visible={viewerVisible}
            data={viewData}
            onRemove={async (id) => {
              await handleRemove(id);
              setViewerVisible(false);
            }}
          />
          <Modal
            title="修改素材名称"
            visible={materialModelVisible}
            mask={!viewerVisible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            centered
          >
            <Input
              onChange={(e) => {
                setMaterialName(e.target.value);
              }}
              onKeyUp={(e) => {
                if (e.key === 'Enter' || e.keyCode === 13) {
                  handleOk();
                }
              }}
              maxLength={150}
              value={materialName}
            />
          </Modal>
        </MaterialManageContainer>
      </div>
    </>
  );
};
export default MaterialManage;
