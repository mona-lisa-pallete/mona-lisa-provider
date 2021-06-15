import React from 'react';

interface FileContentProps {
  value?: any;
  onChange?: (data: any) => void;
}

const FileContent: React.FC<FileContentProps> = (props) => {
  const { value } = props;

  return <div>{Array.isArray(value) && `${value.length}份文档`}</div>;
};
export default FileContent;
