import styled from 'styled-components';
import { StatusType } from './types';

const StatusBg = {
  [StatusType.Primary]: '#F5F5F7',
  [StatusType.Warning]: '#FEF1E3',
  [StatusType.Success]: '#EDF9E8',
};

const StatusColor = {
  [StatusType.Primary]: 'color: rgba(5, 12, 50, 0.7)',
  [StatusType.Warning]: '#FA8C16',
  [StatusType.Success]: '#52C41A',
};

export const Status = styled.div<{ type: StatusType }>`
  height: 20px;
  background: ${(props: { type: StatusType }) => StatusBg[props.type]};
  border-radius: 11px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  padding: 5px 12px;
  color: ${(props: { type: StatusType }) => StatusColor[props.type]};
  margin-right: 9px;
  i {
    margin-right: 5px;
    color: ${(props: { type: StatusType }) => StatusColor[props.type]};
    font-size: 12px;
    &:last-child {
      margin-right: 0;
      margin-left: 5px;
    }
  }
`;
