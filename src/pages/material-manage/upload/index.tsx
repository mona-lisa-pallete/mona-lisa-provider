import React, { useEffect, useState, useMemo } from 'react';
import OssUpload from '@/components/OssUpload/';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {
  UploadButton,
  FileListItem,
  UploadContainer,
  FileList,
  ActionButtonContainer,
} from './index.style';
import { Progress, Button, message, Input, Modal } from 'antd';
import editIcon from '@/assets/img/common/edit.png';
import { addMaterials } from '@/services/material';
import { MaterialType } from '../types';
import { getFileName, getFileType, isImgSize, isPic, isVideoSize, isMp4 } from '@/utils/common';
import type { RcFile } from 'antd/lib/upload';
import './index.less';
import { MessageType } from '@/utils/message';
import { MIME } from '../components/File/types';

enum FileType {
  Img = 'image',
  Video = 'video',
  File = 'file',
}
const { confirm } = Modal;

const MaterialManageUpload: React.FC = () => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  useEffect(() => {
    document.querySelector('aside')!.style.display = 'none';
    const header = document.querySelector('.reset-antd') as HTMLElement;
    header.style.display = 'none';
    document.title = '素材上传';
    const main = document.querySelector('main')!;
    main.style.background = '#ffffff';
    main.style.margin = '0';
  }, []);

  const loading = useMemo(() => {
    return fileList.some((i) => i.percent !== 100) || submitLoading;
  }, [fileList, submitLoading]);

  const addMaterialData = async () => {
    const isNullName = fileList.some((i) => !i.inputName);
    if (isNullName) {
      message.warning({
        content: '素材名称不能为空',
        style: {
          marginTop: '210px',
        },
      });
      return;
    }
    setSubmitLoading(true);

    const list = fileList.map((i) => {
      return {
        materialType: i.fileType,
        ossUrl: i.url,
        materialName: i.inputName,
      };
    });

    const res = await addMaterials({
      materials: list,
    });
    if (res.code === 0) {
      setSubmitLoading(false);
      message.success({
        content: '上传成功',
        style: {
          marginTop: '210px',
        },
      });
      setFileList([]);
      window.opener.postMessage(MessageType.UploadSuccess, '*');
    }
  };

  const handleFileName = (index: number, value: string) => {
    setFileList((arr) => {
      arr[index].inputName = value;
      return [...arr];
    });
  };

  const validateImg = async (file: RcFile, gifCheck?: boolean) => {
    const types = ['image/png', 'image/jpeg'];
    if (gifCheck) {
      types.push('image/gif');
    }
    if (!isPic(file.name)) {
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
    const url = window.URL || window.webkitURL;
    const img = new Image(); // 手动创建一个Image对象
    img.src = url.createObjectURL(file); // 创建Image的对象的url
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

  return (
    <UploadContainer>
      <OssUpload
        type="imgVideoFile"
        multiple
        beforeUpload={async (file) => {
          const imgTypes = ['.png', '.jpeg', '.jpg'];
          const videoTypes = ['.mp4'];
          const fileTypes = Object.keys(MIME).map((i) => `.${i}`);
          if (imgTypes.includes(getFileType(file.name))) {
            await validateImg(file);
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
        }}
        onChange={(file) => {
          if (file) {
            const fileData: any = {
              ...file,
            };

            setFileList((list) => {
              const ids = list.map((i) => i.uid);
              const index = ids.indexOf(fileData.uid);
              if (index > -1) {
                list[index] = { ...list[index], ...fileData };
                return [...list];
              } else {
                const isVideo = fileData.name.includes('.mp4');
                const isImg =
                  fileData.name.includes('.jpg') ||
                  fileData.name.includes('.gif') ||
                  fileData.name.includes('.png') ||
                  fileData.name.includes('.jpeg');
                if (isImg) {
                  fileData.fileType = FileType.Img;
                } else if (isVideo) {
                  fileData.fileType = FileType.Video;
                } else {
                  fileData.fileType = FileType.File;
                }
                fileData.url = window.URL.createObjectURL(file.originFileObj);
                fileData.inputName = getFileName(file.name);
                fileData.editShow = false;
                return [...list, fileData];
              }
            });
          }
        }}
      >
        <UploadButton>
          <PlusOutlined style={{ fontSize: '22px', opacity: 1 }} />
          <div className="upload-text">
            将文件拖到此处，或 <span>点击上传</span>
          </div>
          <div className="upload-tips">支持文件：.jpg / .png / .mp4 / 文档</div>
        </UploadButton>
      </OssUpload>
      <FileList>
        {fileList.map((i, index) => {
          return (
            <FileListItem>
              <div className="file-item-main">
                {i.fileType === MaterialType.Image && <img src={i.url} />}
                {i.fileType === MaterialType.Video && <video src={i.url} />}
                <div className="file-item__name">
                  {!i.editShow && <div className="file-item__name-text">{i.inputName}</div>}
                  {i.editShow && (
                    <Input
                      autoFocus
                      value={i.inputName}
                      maxLength={150}
                      onKeyUp={(e) => {
                        if (e.keyCode === 13) {
                          (e.target as HTMLElement).blur();
                        }
                      }}
                      onBlur={() => {
                        setFileList((arr) => {
                          arr[index].editShow = false;
                          return [...arr];
                        });
                      }}
                      onChange={(e) => {
                        handleFileName(index, e.target.value);
                      }}
                    />
                  )}
                  {!i.editShow && (
                    <img
                      src={editIcon}
                      onClick={() => {
                        setFileList((arr) => {
                          arr[index].editShow = true;
                          return [...arr];
                        });
                      }}
                    />
                  )}
                </div>
                {i.percent === 100 && (
                  <Button
                    onClick={() => {
                      confirm({
                        title: '提示',
                        icon: <ExclamationCircleOutlined />,
                        content: '删除之后暂时无法找回，是否确认删除？',
                        okText: '确认',
                        okType: 'danger',
                        cancelText: '取消',
                        centered: true,
                        async onOk() {
                          // console.log('OK')
                          setFileList((arr) => {
                            arr.splice(index, 1);
                            return [...arr];
                          });
                        },
                      });
                    }}
                    type="text"
                    danger
                    className="file-item__action"
                  >
                    删除
                  </Button>
                )}
              </div>
              {i.percent !== 100 && (
                <Progress
                  className="file-item__progress"
                  percent={i.percent}
                  strokeWidth={5}
                  showInfo={false}
                />
              )}
            </FileListItem>
          );
        })}
      </FileList>
      <ActionButtonContainer>
        <Button
          onClick={() => {
            window.close();
          }}
          style={{ marginRight: '16px' }}
          size="middle"
        >
          取消
        </Button>
        <Button
          disabled={fileList.length === 0}
          loading={loading}
          size="middle"
          type="primary"
          onClick={addMaterialData}
        >
          确认
        </Button>
      </ActionButtonContainer>
    </UploadContainer>
  );
};

export default MaterialManageUpload;
