import React from 'react';
import { TableTitleWrap } from './index.style';

interface TableTitleProp
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string | undefined;
}

const TableTitle: React.FC<TableTitleProp> = (props) => {
  return (
    <TableTitleWrap className={props.className} style={props.style}>
      <div className="table-title__icon" />
      <div className="table-title__text">{props.children}</div>
    </TableTitleWrap>
  );
};
export default TableTitle;
