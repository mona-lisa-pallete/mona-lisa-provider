import React, { useState, useEffect, useRef } from 'react';
import { Drawer, Spin, Modal, message, Input, Empty, Tooltip } from 'antd';
import { DrawerProps } from 'antd/lib/drawer/index';
import { getMaterials, setMaterial, delMaterial } from '@/services/material/';
import { IGetMaterialsResponseList } from '@/services/material/schema';
import './index.less';
import Viewer from '@/components/Viewer/';
import InfiniteScroll from 'react-infinite-scroller';
import Macy from 'macy';
import TableTitle from '@/components/TableTitle';
import Seach from './seach';
import { useModel } from 'umi';
import { MessageType } from '@/utils/message';
import { ViewerItem } from '@/components/Viewer/types';
import { MaterialType } from '@/pages/material-manage/types';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

export interface MaterialLibraryProp {
  visible: boolean;
  drawProp?: DrawerProps;
  type: MaterialType;
  onSelect: (url: string, name: string) => void;
  onClose: () => void;
  beforeSelect?: (data: IGetMaterialsResponseList) => PromiseLike<void>;
  extra?: any;
}

const placeholderData = {
  image: '请输入素材名称',
  video: '请输入素材名称',
};
const MaterialLibrary: React.FC<MaterialLibraryProp> = (props) => {
  const { visible, type, onSelect, onClose, beforeSelect, extra = {} } = props;
  const [data, setData] = useState<IGetMaterialsResponseList[]>([]);
  const [viewerVisible, setViewerVisible] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [mine, setMine] = useState(false);
  const { userInfo } = useModel('useUserModel');
  const viewerRef = useRef<any>();
  const [viewerSelected, setViewerSelected] = useState(0);
  const [viewData, setViewData] = useState<ViewerItem[]>([]);
  const [materialModelVisible, setMaterialModelVisible] = useState(false);
  const [materialName, setMaterialName] = useState('');
  const [materialId, setMaterialId] = useState<number>();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const getMaterialsData = (reset?: boolean) => {
    if (!visible || loading) {
      return;
    }
    if (reset && page !== 1) {
      setPage(1);
      return;
    }
    setLoading(true);
    getMaterials({
      limit: 20,
      materialType: type,
      page: reset ? 1 : page,
      materialName: search,
      createUserId: mine ? `${userInfo?.id}` : '',
      ...extra,
    }).then((res) => {
      if (res.code === 0) {
        // setLoading(false)
        const { list, totalCount } = res.data;
        if (reset || page === 1) {
          setData(list);
        } else {
          setData(data.concat(list));
        }
        setTotal(totalCount);
        const macyInstance = new Macy({
          container: '.material-library__list', // 图像列表容器
          trueOrder: false,
          waitForImages: false,
          useOwnImageLoader: false,
          debug: true,
          margin: { x: 16, y: 12 }, // 设计列与列的间距
          columns: 2, // 设置列数
        });
        macyInstance.runOnImageLoad(function () {
          macyInstance.recalculate(true);
        }, true);
        macyInstance.on(macyInstance.constants.EVENT_IMAGE_COMPLETE, () => {
          setLoading(false);
        });
      }
    });
  };

  const handleSelect = (i: IGetMaterialsResponseList) => {
    onSelect(i.ossUrl, i.materialName);
    onClose();
  };

  const handlePreview = (index: number) => {
    const arr = data.map((i) => {
      return {
        url: i.ossUrl,
        type,
        id: i.id,
      };
    });
    setViewerVisible(true);
    setViewerSelected(index);
    setViewData(arr);
  };

  const handleChangeName = (name: string, id: number) => {
    setMaterialName(name);
    setMaterialId(id);
    setMaterialModelVisible(true);
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
      getMaterialsData(true);
      message.success('修改成功');
    }
    viewerRef.current.fetchData();
  };

  const handleCancel = () => {
    setConfirmLoading(false);
    setMaterialModelVisible(false);
  };

  const handleInfiniteOnLoad = () => {
    if (data.length >= total || loading) {
      return;
    }
    setPage(page + 1);
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
          const res = await delMaterial(id);
          if (res.code === 0) {
            setViewerVisible(false);
            getMaterialsData(true);
          }
        },
      });
    });
  };

  useEffect(() => {
    getMaterialsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    getMaterialsData(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, mine]);

  useEffect(() => {
    const messageListener = (e: MessageEvent) => {
      if (e.data === MessageType.UploadSuccess) {
        getMaterialsData(true);
      }
    };
    if (!visible) {
      setData([]);
      setPage(1);
      setLoading(false);
      window.removeEventListener('message', messageListener);
      return;
    }
    window.addEventListener('message', messageListener);
    getMaterialsData();
    return () => {
      window.removeEventListener('message', messageListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <Drawer
      className="material-library"
      visible={visible}
      {...props.drawProp}
      width="400"
      zIndex={1000}
      title={
        <div className="material-library__header">
          <div className="header__title">
            <TableTitle>落地页素材库</TableTitle>
          </div>
        </div>
      }
      onClose={onClose}
    >
      <Seach
        placeholder={placeholderData[type]}
        onChange={(seach, val) => {
          setSearch(seach);
          setMine(val);
        }}
      />
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
        mask={false}
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
      <div className="material-library__scroll">
        {loading && (
          <Spin
            spinning={loading}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
        )}
        {total === 0 && !loading && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        <InfiniteScroll
          initialLoad={false}
          className="material-library__list"
          pageStart={1}
          loadMore={handleInfiniteOnLoad}
          hasMore={!loading}
          useWindow={false}
        >
          {data.map((i, index) => {
            return (
              <div className="material-library__item">
                <div className="material-library-item__main">
                  {type === 'image' ? (
                    <img src={`${i.ossUrl}?x-oss-process=image/format,jpg/interlace,1`} alt="" />
                  ) : (
                    <img src={`${i.ossUrl}?x-oss-process=video/snapshot,t_0,f_jpg,m_fast`} />
                  )}
                  <div className="material-library-item__mask">
                    <div
                      className="material-library-item__btn"
                      onClick={async () => {
                        if (beforeSelect) {
                          await beforeSelect(i);
                        }
                        handleSelect(i);
                      }}
                    >
                      使用
                    </div>
                    <div
                      className="material-library-item__btn"
                      onClick={() => {
                        handlePreview(index);
                      }}
                    >
                      预览
                    </div>
                  </div>
                </div>
                <div className="material-name">
                  <Tooltip title={i.materialName}>
                    <div>{i.materialName}</div>
                  </Tooltip>
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </Drawer>
  );
};
export default MaterialLibrary;
