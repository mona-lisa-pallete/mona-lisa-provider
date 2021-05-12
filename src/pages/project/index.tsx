import PageHeader from '@/components/PageHeader';
import { Button } from 'antd';
import React from 'react';
import { ProjectContainer, ProjectListContainer, ProjectMain } from './index.style';
import { QueryFilter, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import ProjectItem from './components/ProjectItem';

const Project: React.FC = () => {
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
        >
          <ProFormText name="name" label="项目名称" />
          <ProFormSelect name="creater" label="创建人" />
        </QueryFilter>
        <ProjectListContainer>
          <ProjectItem />
          <ProjectItem />
          <ProjectItem />
          <ProjectItem />
          <ProjectItem />
          <ProjectItem />
          <ProjectItem />
          <ProjectItem />
          <ProjectItem />
        </ProjectListContainer>
      </ProjectMain>
    </ProjectContainer>
  );
};

export default Project;
