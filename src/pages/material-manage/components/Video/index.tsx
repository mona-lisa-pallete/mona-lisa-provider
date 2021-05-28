import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { ProFormText, ProFormDateRangePicker, ProFormSelect } from '@ant-design/pro-form';
import { Query, MaterialManageList, MaterialManageMenuBtn } from '../../index.style';
import { Tooltip, Dropdown, Menu, Image, Modal, Pagination, notification, Form, Empty } from 'antd';
import { EllipsisOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { getMaterials } from '@/services/material/';
import { IGetMaterialsResponseList } from '@/services/material/schema';
import PlaceholderImg from '@/components/PlaceholderImg/';
import preview from '@/assets/img/common/preview.png';
import { MaterialType } from '../../types';
// import { getUser } from '@/services/common';
// import { UserRequestType } from '@/services/common/schema';
import download from 'downloadjs';
import { MessageType } from '@/utils/message';
import { VideoMaterialProps, VideoRef } from './types';

const { confirm } = Modal;

const MaterialManage = (props: VideoMaterialProps, ref: React.Ref<VideoRef>) => {
  const { onPreview, onChangeName, onDelMaterial } = props;
  const [queryForm] = Form.useForm();
  const [query, setQuery] = useState<any>({});

  const [videoList, setVideoList] = useState<IGetMaterialsResponseList[]>([]);
  const [videoPageNum, setVideoPageNum] = useState(1);
  const [videoPageSize, setVideoPageSize] = useState(20);
  const [videoTotal, setVideoTotal] = useState(0);

  useImperativeHandle(ref, () => {
    return {
      getVideoData() {
        return getVideoData;
      },
    };
  });

  useEffect(() => {
    const messageListener = (e: MessageEvent) => {
      if (e.data === MessageType.UploadSuccess) {
        queryForm.submit();
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

  const getVideoData = useCallback(
    async () => {
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
    getVideoData();
  }, [getVideoData]);

  const handleChangeName = (name: string, id: number) => {
    onChangeName(name, id);
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

  const handleViewer = (index: number, type: MaterialType) => {
    //
    const data = videoList.map((i) => {
      return {
        url: i.ossUrl,
        type,
        id: i.id,
      };
    });
    onPreview(index, data, true);
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
          // const res = await delMaterial(id);
          // if (res.code === 0) {
          //   const data = await getVideoData();
          //   resolve(data);
          // }
          onDelMaterial(id);
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
    setVideoPageNum(1);
    setVideoPageSize(20);
  };

  return (
    <div>
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
      </div>
    </div>
  );
};
export default forwardRef(MaterialManage);
