import React, { useCallback, useState, useRef } from 'react';
import { Form, Select, Radio, message } from 'antd';
import ConfirmModal from '@/components/ConfirmModal';
import { getProjects } from '@/services/project';
import { ProjectItem as ProjectItemType } from '@/services/project/schema';
import { throttle } from 'lodash';
import { PageEdit } from '../../types';

import './index.less';

const { Option } = Select;

export interface IProps {
  onChangeVisible: (visible: boolean) => void;
  visible: boolean;
  projectId: number;
}

const CopyPageModal: React.FC<IProps> = (props) => {
  const [projects, setProjects] = useState<ProjectItemType[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState('');
  const pageStatus = useRef<{ total?: number; currentPage?: number }>({});
  const projectCache = useRef<any>({});
  const [form] = Form.useForm();

  const copyPage = useCallback(() => {
    const { pageType, project } = form.getFieldsValue();
    if (pageType === 1) {
      if (project) {
        window.open(`/davinciprovider/editor?type=${PageEdit.Add}&projectId=${project}`);
      } else {
        message.error('请选择项目');
      }
    } else {
      window.open(`/davinciprovider/editor?type=${PageEdit.Add}&projectId=${props.projectId}`);
    }
  }, []);

  const onFinish = useCallback(() => {
    copyPage();
  }, []);

  const getData = useCallback(async () => {
    const page = (pageStatus.current.currentPage || 0) + 1;
    const cacheKey = `name=${searchName}&page=${page}`;
    let data = null;
    if (projectCache.current[cacheKey]) {
      data = projectCache.current[cacheKey];
    } else {
      const res = await getProjects({
        name: searchName,
        createUserName: '',
        currentPage: page,
      });
      data = res.data;
      projectCache.current[cacheKey] = data;
    }
    pageStatus.current.currentPage = +data.currentPage;
    pageStatus.current.total = data.totalCount;
    return data!.list as ProjectItemType[];
  }, [pageStatus, searchName]);

  const onDropdownVisibleChange = useCallback(async () => {
    setLoading(true);
    pageStatus.current.currentPage = 0;
    pageStatus.current.total = 0;
    const list = await getData();
    setProjects(list);
    setLoading(false);
  }, [setProjects, setLoading, getData]);

  const onSearch = useCallback(
    throttle(async (name) => {
      if (searchName === name) return;
      setLoading(true);
      setSearchName(name);
      pageStatus.current.currentPage = 0;
      pageStatus.current.total = 0;
      const list = await getData();
      if (searchName === name) {
        setProjects(list);
        setLoading(false);
      }
    }, 1000),
    [getData, searchName],
  );

  const onPopupScroll = useCallback(
    async (e: any) => {
      const { currentPage, total } = pageStatus.current || {};
      if (loading || currentPage! * 20 >= total!) return;
      const posDetail = e.target
        .querySelector('.rc-virtual-list-holder-inner')
        .getBoundingClientRect();
      const { bottom } = posDetail;
      const { bottom: containerBottom } = e.target.getBoundingClientRect();
      if (containerBottom === bottom) {
        setLoading(true);
        const list = await getData();
        setProjects([...projects, ...list]);
        setLoading(false);
      }
    },
    [projects, getData, loading],
  );

  return (
    <ConfirmModal
      onChangeVisible={props.onChangeVisible}
      visible={props.visible}
      onOk={copyPage}
      title={'复制页面'}
    >
      <Form
        className="cppage-modal-content"
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item name="pageType" label="页面类型">
          <Radio.Group defaultValue={0}>
            <Radio value={0}>当前项目</Radio>
            <Radio value={1}>其他项目</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item shouldUpdate noStyle>
          {() => {
            const { pageType } = form.getFieldsValue();
            return pageType ? (
              <Form.Item name="project">
                <Select
                  className="select"
                  showSearch
                  placeholder="请选择项目名称"
                  optionFilterProp="children"
                  onSearch={onSearch}
                  onDropdownVisibleChange={onDropdownVisibleChange}
                  onPopupScroll={onPopupScroll}
                >
                  {projects.map((project) => (
                    <Option key={project.id} value={project.id}>
                      {project.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            ) : null;
          }}
        </Form.Item>
      </Form>
    </ConfirmModal>
  );
};

export default CopyPageModal;
