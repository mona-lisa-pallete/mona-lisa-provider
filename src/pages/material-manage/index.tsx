import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ProFormText, ProFormDateRangePicker, ProFormSelect } from '@ant-design/pro-form';
import {
  Query,
  MaterialManageContainer,
  MaterialManageList,
  MaterialManageMenuBtn,
} from './index.style';
import {
  Tabs,
  Button,
  Tooltip,
  Dropdown,
  Menu,
  Image,
  Input,
  Modal,
  message,
  Pagination,
  notification,
  Form,
  Empty,
} from 'antd';
import { EllipsisOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { getMaterials, setMaterial, delMaterial } from '@/services/material/';
import { IGetMaterialsResponseList } from '@/services/material/schema';
import PlaceholderImg from '@/components/PlaceholderImg/';
import preview from '@/assets/img/common/preview.png';
import Viewer from '@/components/Viewer/';
import { ViewerItem } from '@/components/Viewer/types';
import { MaterialType } from './types';
// import { getUser } from '@/services/common';
// import { UserRequestType } from '@/services/common/schema';
import download from 'downloadjs';
import { useModel } from 'umi';
import { MessageType } from '@/utils/message';

const { TabPane } = Tabs;

const { confirm } = Modal;

const MaterialManage: React.FC = () => {
  const [queryForm] = Form.useForm();
  const { setUploadNewWindow } = useModel('useCommonModel');
  // const { userInfo } = useModel('useUserModel');
  const [materialType, setMaterialType] = useState(MaterialType.Image);
  const [viewData, setViewData] = useState<ViewerItem[]>([]);
  const [viewerVisible, setViewerVisible] = useState(false);
  const [viewerSelected, setViewerSelected] = useState(0);
  const [materialModelVisible, setMaterialModelVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [materialName, setMaterialName] = useState('');
  const [materialId, setMaterialId] = useState<number>();
  const viewerRef = useRef<any>();
  // const [userOption, setUserOption] = useState<Array<{ label: string; value: string | number }>>(
  //   [],
  // );
  const [query, setQuery] = useState<any>({});

  const [imageList, setImageList] = useState<IGetMaterialsResponseList[]>([]);
  const [imagePageNum, setImagePageNum] = useState(1);
  const [imagePageSize, setImagePageSize] = useState(20);
  const [imageTotal, setImageTotal] = useState(0);

  const [videoList, setVideoList] = useState<IGetMaterialsResponseList[]>([]);
  const [videoPageNum, setVideoPageNum] = useState(1);
  const [videoPageSize, setVideoPageSize] = useState(20);
  const [videoTotal, setVideoTotal] = useState(0);

  useEffect(() => {
    const messageListener = (e: MessageEvent) => {
      if (e.data === MessageType.UploadSuccess) {
        queryForm.submit();
        setImagePageNum(1);
        setVideoPageNum(1);
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

  const getImageData = useCallback(
    async (init?: boolean) => {
      if (materialType !== MaterialType.Image && !init) {
        return;
      }
      const res = await getMaterials({
        limit: imagePageSize,
        materialType: 'image',
        page: imagePageNum,
        ...query,
      });

      setImageList(res.data.list);
      setImageTotal(res.data.totalCount);
      return Promise.resolve(res.data.list);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [imagePageNum, imagePageSize, query],
  );

  const getVideoData = useCallback(
    async (init?: boolean) => {
      if (materialType !== MaterialType.Video && !init) {
        return;
      }
      const res = await getMaterials({
        limit: videoPageSize,
        materialType: 'video',
        page: videoPageNum,
        ...query,
      });
      setVideoList(res.data.list);
      setVideoTotal(res.data.totalCount);
      return Promise.resolve(res.data.list);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [videoPageSize, videoPageNum, query],
  );

  useEffect(() => {
    getImageData(true);
  }, [getImageData]);

  useEffect(() => {
    getVideoData(true);
  }, [getVideoData]);

  const handleViewer = (index: number, type: MaterialType) => {
    const list = type === MaterialType.Image ? imageList : videoList;

    const data = list.map((i) => {
      return {
        url: i.ossUrl,
        type,
        id: i.id,
      };
    });
    setViewerSelected(index);
    setViewData(data);
    setViewerVisible(true);
  };

  const downloadFile = (url: string, type: MaterialType, name: string) => {
    const x = new XMLHttpRequest();
    x.open('GET', url, true);
    x.responseType = 'blob';
    const fileType = url.substring(url.lastIndexOf('.') + 1);
    let mimeType: string;
    if (type === MaterialType.Image) {
      mimeType = `image/${fileType}`;
    } else {
      mimeType = 'video/mp4';
    }
    x.onload = function (e: any) {
      download(e.target.response, `${name}.${fileType}`, mimeType);
    };
    x.send();
  };

  const menu = (item: IGetMaterialsResponseList) => {
    return (
      <MaterialManageMenuBtn>
        <Menu.Item
          key="edit"
          onClick={() => {
            handleChangeName(item.materialName, item.id);
          }}
        >
          修改名称
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          key="copy"
          onClick={() => {
            const isBig = item.contentLength / 1024 / 1024 > 5;
            if (isBig) {
              notification.info({
                message: '下载较大视频文件时需要等待',
              });
            }
            downloadFile(item.ossUrl, item.materialType as MaterialType, item.materialName);
          }}
        >
          下载素材
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          key="del"
          className="menu-item--del"
          onClick={() => {
            handleRemove(item.id);
          }}
        >
          删除
        </Menu.Item>
      </MaterialManageMenuBtn>
    );
  };

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
      switch (materialType) {
        case MaterialType.Image:
          // eslint-disable-next-line no-case-declarations
          await getImageData();
          break;
        case MaterialType.Video:
          // eslint-disable-next-line no-case-declarations
          await getVideoData();
          break;
        default:
          break;
      }
      message.success('修改成功');
    }
    if (viewerVisible) {
      viewerRef.current.fetchData();
    }
  };

  const handleCancel = () => {
    setConfirmLoading(false);
    setMaterialModelVisible(false);
  };

  const handleChangeName = (name: string, id: number) => {
    setMaterialName(name);
    setMaterialId(id);
    setMaterialModelVisible(true);
  };

  const handleRemove = (id: string | number) => {
    return new Promise((resolve) => {
      confirm({
        title: '提示',
        icon: <ExclamationCircleOutlined />,
        content: '删除之后暂时无法找回，是否确认删除？',
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        centered: true,
        async onOk() {
          const res = await delMaterial(id);
          if (res.code === 0) {
            switch (materialType) {
              default:
              case MaterialType.Image:
                // eslint-disable-next-line no-case-declarations
                const list = await getImageData();
                resolve(list);
                break;
              case MaterialType.Video:
                // eslint-disable-next-line no-case-declarations
                const data = await getVideoData();
                resolve(data);
                break;
            }
          }
        },
      });
    });
  };

  const handleSubmit = async (values: any) => {
    const data = { ...values };
    data.createUserId = values.creater ? values.creater.toString() : '';
    if (values.date && values.date.length > 0) {
      data.beginTime = values.date[0];
      data.endTime = values.date[1];
    }
    resetPage();
    setQuery(data);
  };

  const handleReset = () => {
    resetPage();
    setQuery({});
  };

  const resetPage = () => {
    switch (materialType) {
      default:
      case MaterialType.Image:
        setImagePageNum(1);
        setImagePageSize(20);
        break;
      case MaterialType.Video:
        setVideoPageNum(1);
        setVideoPageSize(20);
        break;
    }
  };

  return (
    <MaterialManageContainer>
      <div>
        <Query
          form={queryForm}
          labelWidth="auto"
          submitter={{ submitButtonProps: { className: 'submit-file' } }}
          onFinish={handleSubmit}
          onReset={handleReset}
          layout="inline"
        >
          <ProFormText name="materialName" label="素材名称" />
          <ProFormSelect
            options={[]}
            mode="multiple"
            name="creater"
            fieldProps={{ filterOption: true, maxTagCount: 'responsive' }}
            label="上传人"
          />
          <ProFormDateRangePicker name="date" label="日期区间" />
        </Query>
      </div>
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
        <Tabs
          defaultActiveKey={MaterialType.Image}
          onTabClick={(key) => {
            setMaterialType(key as MaterialType);
          }}
        >
          <TabPane tab="图片素材" key={MaterialType.Image}>
            <MaterialManageList>
              {imageList.map((item, index) => {
                return (
                  <div className="material-manage-item" key={item.id}>
                    <div className="material-manage-item__box">
                      <Image
                        src={item.ossUrl}
                        preview={false}
                        className="material-manage__col-name-img"
                        placeholder={<PlaceholderImg />}
                      />
                      <div className="material-manage-item__mask">
                        <div
                          className="material-manage-item__mask-action"
                          onClick={() => {
                            handleViewer(index, MaterialType.Image);
                          }}
                        >
                          <img src={preview} />
                          <div>查看详情</div>
                        </div>
                      </div>
                    </div>
                    <div className="material-manage-item__action">
                      <Tooltip title={item.materialName}>
                        <div className="material-manage-item__name">{item.materialName}</div>
                      </Tooltip>
                      <Dropdown overlay={menu(item)} className="material-manage-item__btn">
                        <EllipsisOutlined style={{ fontSize: '28px', color: '#D8D8D8' }} />
                      </Dropdown>
                    </div>
                  </div>
                );
              })}
            </MaterialManageList>
            {imageTotal === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            <div style={{ textAlign: 'right', marginBottom: '16px', marginRight: '16px' }}>
              <Pagination
                onChange={(page) => {
                  setImagePageNum(page);
                }}
                onShowSizeChange={(_: number, size: number) => {
                  setImagePageNum(1);
                  setImagePageSize(size);
                }}
                current={imagePageNum}
                total={imageTotal}
                showSizeChanger
                pageSize={imagePageSize}
              />
            </div>
          </TabPane>
          <TabPane tab="视频素材" key={MaterialType.Video}>
            <MaterialManageList>
              {videoList.map((item, index) => {
                return (
                  <div className="material-manage-item" key={item.id}>
                    <div className="material-manage-item__box">
                      <Image
                        src={`${item.ossUrl}?x-oss-process=video/snapshot,t_0,f_jpg,w_600,m_fast`}
                        preview={false}
                        className="material-manage__col-name-img"
                        placeholder={<PlaceholderImg />}
                      />
                      <div className="material-manage-item__mask">
                        <div
                          className="material-manage-item__mask-action"
                          onClick={() => {
                            handleViewer(index, MaterialType.Video);
                          }}
                        >
                          <img src={preview} />
                          <div>查看详情</div>
                        </div>
                      </div>
                    </div>
                    <div className="material-manage-item__action">
                      <Tooltip title={item.materialName}>
                        <div className="material-manage-item__name">{item.materialName}</div>
                      </Tooltip>
                      <Dropdown overlay={menu(item)} className="material-manage-item__btn">
                        <EllipsisOutlined style={{ fontSize: '28px', color: '#D8D8D8' }} />
                      </Dropdown>
                    </div>
                  </div>
                );
              })}
            </MaterialManageList>
            {videoTotal === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            <div style={{ textAlign: 'right', marginBottom: '16px', marginRight: '16px' }}>
              <Pagination
                onChange={(page) => {
                  setVideoPageNum(page);
                }}
                onShowSizeChange={(_: number, size: number) => {
                  setVideoPageNum(1);
                  setVideoPageSize(size);
                }}
                current={videoPageNum}
                total={videoTotal}
                showSizeChanger
                pageSize={videoPageSize}
              />
            </div>
          </TabPane>
        </Tabs>
      </div>
      <Viewer
        onClose={() => {
          setViewerVisible(false);
        }}
        onChangeName={handleChangeName}
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
            if (e.keyCode === 13) {
              handleOk();
            }
          }}
          maxLength={150}
          value={materialName}
        />
      </Modal>
    </MaterialManageContainer>
  );
};
export default MaterialManage;
