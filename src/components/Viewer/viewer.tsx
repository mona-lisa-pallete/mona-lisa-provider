import React, {
  useState,
  useMemo,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from 'react';
import {
  ViewerContainer,
  ViewerMain,
  ViewerBottom,
  ViewerAction,
  ViewerList,
  ViewerFile,
  ViewerDetails,
  ViewerDetailsInfo,
} from './index.style';
import enlargeIcon from '@/assets/img/viewer/enlarge.png';
import detailsIcon from '@/assets/img/viewer/details.png';
import narrowIcon from '@/assets/img/viewer/narrow.png';
import delIcon from '@/assets/img/viewer/del.png';
import downloadIcon from '@/assets/img/viewer/download.png';
import listIcon from '@/assets/img/viewer/list.png';
import editIcon from '@/assets/img/viewer/edit.png';
import { ViewerProps, ViewerItem } from './types';
import { MaterialType } from '@/pages/material-manage/types';
import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { getMaterial } from '@/services/material';
import TableTitle from '@/components/TableTitle/';
import { IGetMaterialResponse } from '@/services/material/schema';
import { notification, Tooltip } from 'antd';
import dayjs from 'dayjs';
import download from 'downloadjs';

const level = 5;

const Viewer: React.FC<ViewerProps> = (props) => {
  const {
    data = [],
    selected = 0,
    onClose,
    onChangeName,
    viewerRef = React.createRef(),
    onRemove,
    noRemove = false,
    type = 'primary',
    visible,
  } = props;
  const [scale, setScale] = useState(100);
  const [selectedIndex, setSelectedIndex] = useState(selected);
  const [materialData, setMaterialData] = useState<IGetMaterialResponse>();
  const [fileList, setFileList] = useState<ViewerItem[]>(data);
  const [detailsVisible, setDetailsVisible] = useState(true);
  const [listVisible, setListVisible] = useState(false);

  const selectedId = useMemo(() => {
    if (!fileList.length) {
      return null;
    }
    return fileList[selectedIndex].id;
  }, [fileList, selectedIndex]);

  const selectedData = useMemo(() => {
    if (!fileList.length) {
      return null;
    }
    return fileList[selectedIndex];
  }, [fileList, selectedIndex]);

  useImperativeHandle(viewerRef, () => {
    return {
      fetchData() {
        getData();
      },
      removeData() {
        setFileList((i) => {
          i.splice(selectedIndex, 1);
          return [...i];
        });
      },
    };
  });

  const getData = useCallback(async () => {
    if (!fileList.length) {
      return;
    }
    const { id } = fileList[selectedIndex];
    const res = await getMaterial(id);
    if (res.code === 0) {
      res.data.createTime = dayjs(res.data.createTime).format('YYYY-MM-DD HH:mm:ss');
      setMaterialData(res.data);
    }
  }, [fileList, selectedIndex]);

  useEffect(() => {
    getData();
  }, [getData]);

  const enlarge = () => {
    setScale((i) => {
      if (i === 900) {
        // message.warning('放大倍率最小为900')
        return i;
      }
      if (i < level) {
        return i + 1;
      }
      return i + level;
    });
  };

  const narrow = () => {
    setScale((i) => {
      if (i === 1) {
        // message.warning('缩小倍率最小为1')
        return 1;
      }
      if (i <= level) {
        return i - 1;
      }
      return i - level;
    });
  };

  const handleSelectedIndex = (index: number) => {
    setScale(100);
    setSelectedIndex(index);
  };

  useEffect(() => {
    window.onmousewheel = (e) => {
      if (e.wheelDelta) {
        if (e.wheelDelta > 0) {
          // 当滑轮向上滚动时
          enlarge();
        }
        if (e.wheelDelta < 0) {
          // 当滑轮向下滚动时
          narrow();
        }
      }
    };
  }, []);

  const isStart = selectedIndex === 0;
  const isLast = selectedIndex === fileList.length - 1;

  useEffect(() => {
    document.onkeydown = (e) => {
      if (!visible) {
        return;
      }
      if (e.keyCode === 37 && selectedIndex !== 0) {
        prev();
      } else if (e.keyCode === 39 && selectedIndex !== fileList.length - 1) {
        next();
      } else if (e.keyCode === 27 && visible) {
        onClose && onClose();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, selectedIndex]);

  const handleEditVisible = () => {
    if (!selectedId) {
      return;
    }
    onChangeName && onChangeName(materialData?.materialName || '', selectedId);
  };

  const handleDetailsVisible = () => {
    setDetailsVisible((i) => {
      return !i;
    });
  };

  const handleListVisible = () => {
    setListVisible((i) => {
      return !i;
    });
  };

  const fileSizeText = useMemo(() => {
    if (!materialData?.contentLength) {
      return '';
    }
    const kb = materialData.contentLength / 1024;
    if (kb < 1024) {
      return `${kb.toFixed(3)}K`;
    }
    return `${(kb / 1024).toFixed(3)}M`;
  }, [materialData]);

  const prev = () => {
    setSelectedIndex((i) => {
      return i - 1;
    });
  };

  const next = () => {
    setSelectedIndex((i) => {
      return i + 1;
    });
  };

  return (
    <ViewerContainer>
      <ViewerMain>
        <ViewerFile>
          <CloseOutlined
            onClick={() => {
              onClose && onClose();
            }}
            style={{
              fontSize: '20px',
              position: 'absolute',
              right: '20px',
              top: '20px',
              zIndex: 12,
              color: '#fff',
            }}
          />
          {!isStart && (
            <LeftOutlined
              className="action-prev"
              onClick={() => {
                prev();
              }}
              style={{
                fontSize: '17px',
                color: '#fff',
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
          )}
          {fileList.length && selectedData?.type === MaterialType.Image && (
            <img
              style={{
                transform: `translate(-50%, -50%) scale(${scale / 100})`,
              }}
              src={selectedData.url}
            />
          )}
          {fileList.length && selectedData?.type === MaterialType.Video && (
            <video
              controls
              style={{
                transform: `translate(-50%, -50%) scale(${scale / 100})`,
                outline: '-webkit-focus-ring-color auto 0px',
              }}
              src={selectedData.url}
            />
          )}
          {fileList.length &&
            selectedData?.type === MaterialType.File &&
            selectedData.url.includes('.pdf') && (
              <iframe
                style={{
                  transform: `translate(-50%, -50%) scale(${scale / 100})`,
                }}
                frameBorder={0}
                src={selectedData.url}
              />
            )}
          {fileList.length &&
            selectedData?.type === MaterialType.File &&
            !selectedData.url.includes('.pdf') && (
              <iframe
                style={{
                  transform: `translate(-50%, -50%) scale(${scale / 100})`,
                }}
                frameBorder={0}
                src={`http://view.officeapps.live.com/op/view.aspx?src=${selectedData.url}`}
              />
            )}
          {!isLast && (
            <RightOutlined
              className="action-next"
              onClick={() => {
                next();
              }}
              style={{
                fontSize: '17px',
                color: '#fff',
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
          )}
        </ViewerFile>
        {type === 'primary' && (
          <ViewerDetails
            style={{
              width: detailsVisible ? '19.0336%' : '0',
              minWidth: detailsVisible ? '260px' : '0',
            }}
          >
            <TableTitle
              className="viewer-title"
              style={{
                height: '48px',
                paddingLeft: '15px',
                color: '#fff',
                borderBottom: '1px solid #575757',
              }}
            >
              素材详情
            </TableTitle>
            <ViewerDetailsInfo>
              <div className="info-item">
                <div className="info-item__label">素材ID:</div>
                <div className="info-item__value">{materialData?.id}</div>
              </div>
              <div className="info-item">
                <div className="info-item__label">素材名称:</div>
                <div className="info-item__value info-item__value--material">
                  <Tooltip title={materialData?.materialName}>
                    <div className="info-material">{materialData?.materialName}</div>
                  </Tooltip>
                  <img onClick={handleEditVisible} src={editIcon} />
                </div>
              </div>
              <div className="info-item">
                <div className="info-item__label">上传人:</div>
                <div className="info-item__value">{materialData?.createUserName}</div>
              </div>
              <div className="info-item">
                <div className="info-item__label">上传时间:</div>
                <div className="info-item__value">{materialData?.createTime}</div>
              </div>
            </ViewerDetailsInfo>
            <ViewerDetailsInfo style={{ borderBottom: 'none' }}>
              <div className="info-item">
                <div className="info-item__label">格式:</div>
                <div className="info-item__value">{materialData?.contentType}</div>
              </div>
              <div className="info-item">
                <div className="info-item__label">大小:</div>
                <div className="info-item__value">{fileSizeText}</div>
              </div>
              <div className="info-item">
                <div className="info-item__label">宽度:</div>
                <div className="info-item__value">{`${materialData?.contentWidth || ''}像素`}</div>
              </div>
              <div className="info-item">
                <div className="info-item__label">高度:</div>
                <div className="info-item__value">{`${materialData?.contentHeight || ''}像素`}</div>
              </div>
            </ViewerDetailsInfo>
          </ViewerDetails>
        )}
      </ViewerMain>
      <ViewerBottom>
        <ViewerAction>
          <Tooltip title="放大">
            <img src={enlargeIcon} style={{ marginRight: '17px' }} onClick={enlarge} />
          </Tooltip>
          <div
            style={{ marginRight: '17px' }}
            onClick={() => {
              setScale((i) => {
                if (i === 100) {
                  return 50;
                } else {
                  return 100;
                }
              });
            }}
            className="scale-value"
          >
            {scale}%
          </div>
          <Tooltip title="缩小">
            <img style={{ marginRight: '20px' }} src={narrowIcon} onClick={narrow} />
          </Tooltip>
          <div className="line" />
          <Tooltip title="下载">
            <img
              style={{ marginRight: '24px' }}
              src={downloadIcon}
              onClick={() => {
                const url = selectedData?.url;
                const materialType = selectedData?.type;
                const name = materialData?.materialName;
                notification.info({
                  message: '下载大文件时需要等待',
                });
                const x = new XMLHttpRequest();
                x.open('GET', url!, true);
                x.responseType = 'blob';
                const fileType = url!.substring(url!.lastIndexOf('.') + 1);
                let mimeType: string;
                if (materialType === MaterialType.Image) {
                  mimeType = `image/${fileType}`;
                } else {
                  mimeType = 'video/mp4';
                }
                x.onload = function (e: any) {
                  download(e.target.response, `${name}.${fileType}`, mimeType);
                };
                x.send();
              }}
            />
          </Tooltip>
          <Tooltip title="删除">
            {!noRemove && (
              <img
                style={{ marginRight: '24px' }}
                src={delIcon}
                onClick={async () => {
                  if (onRemove) {
                    await onRemove(selectedId!);
                  }
                }}
              />
            )}
          </Tooltip>
          <Tooltip title="展开列表">
            {type === 'primary' && (
              <img style={{ marginRight: '24px' }} src={listIcon} onClick={handleListVisible} />
            )}
          </Tooltip>
          <Tooltip title="详情">
            {type === 'primary' && (
              <img
                style={{ marginRight: '24px' }}
                src={detailsIcon}
                onClick={handleDetailsVisible}
              />
            )}
          </Tooltip>
        </ViewerAction>
        <ViewerList
          style={{
            height: listVisible ? '87px' : '0',
          }}
        >
          <div>
            {fileList.map((item, index) => {
              let dom;
              switch (item.type) {
                case MaterialType.Video:
                  dom = (
                    <video
                      onClick={() => {
                        handleSelectedIndex(index);
                      }}
                      src={item.url}
                    />
                  );
                  break;
                case MaterialType.Image:
                default:
                  dom = (
                    <img
                      onClick={() => {
                        handleSelectedIndex(index);
                      }}
                      style={{ opacity: index === selectedIndex ? '1' : '0.24' }}
                      src={item.url}
                    />
                  );
                  break;
              }
              return dom;
            })}
          </div>
        </ViewerList>
      </ViewerBottom>
    </ViewerContainer>
  );
};

// @ts-ignore
export default forwardRef(Viewer);
