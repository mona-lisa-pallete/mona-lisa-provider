import PageHeader from '@/components/PageHeader';
import { Button, Menu } from 'antd';
import React from 'react';
import { MenuBtn, ProjectContainer, ProjectListContainer, ProjectMain } from './index.style';
import { QueryFilter, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import ProjectItem from './components/ProjectItem';
import { useHistory } from 'react-router';

const Project: React.FC = () => {
  const history = useHistory();

  const menu = () => {
    return (
      <MenuBtn>
        <Menu.Item key="edit">删除</Menu.Item>
      </MenuBtn>
    );
  };

  const goToPage = () => {
    history.push({
      pathname: `/page`,
      query: {
        projectId: '1',
      },
    });
  };

  return (
    <ProjectContainer>
      <PageHeader title="项目列表">
        <Button type="primary">创建项目</Button>
      </PageHeader>
      <ProjectMain>
        <QueryFilter<{
          name: string;
          company: string;
        }>
          onFinish={async (values) => {
            console.log(values.name);
          }}
          labelAlign="left"
        >
          <ProFormText name="name" label="项目名称" />
          <ProFormSelect name="creater" label="创建人" />
        </QueryFilter>
        <ProjectListContainer>
          <ProjectItem onClick={goToPage} actionRender={menu()} />
          {/* <ProjectItem />
          <ProjectItem />
          <ProjectItem />
          <ProjectItem />
          <ProjectItem />
          <ProjectItem />
          <ProjectItem />
          <ProjectItem /> */}
        </ProjectListContainer>
      </ProjectMain>
    </ProjectContainer>
  );
};

export default Project;
