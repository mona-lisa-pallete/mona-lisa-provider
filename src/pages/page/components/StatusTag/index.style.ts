import styled from 'styled-components';
import { PageStatusType } from './types';

const StatusBg = {
  [PageStatusType.Offline]: '#F5F5F7',
  [PageStatusType.Deploy]: '#FEF1E3',
  [PageStatusType.Audit]: '#FEF1E3',
  [PageStatusType.Online]: '#EDF9E8',
};

const StatusColor = {
  [PageStatusType.Offline]: 'color: rgba(5, 12, 50, 0.7)',
  [PageStatusType.Deploy]: '#FA8C16',
  [PageStatusType.Audit]: '#FA8C16',
  [PageStatusType.Online]: '#52C41A',
};

export const Status = styled.div<{ type: PageStatusType }>`
  height: 20px;
  background: ${(props: { type: PageStatusType }) => StatusBg[props.type]};
  border-radius: 11px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  padding: 5px 12px;
  color: ${(props: { type: PageStatusType }) => StatusColor[props.type]};
  margin-right: 9px;
  i {
    margin-right: 5px;
    color: ${(props: { type: PageStatusType }) => StatusColor[props.type]};
    font-size: 12px;
    &:last-child {
      margin-right: 0;
      margin-left: 5px;
    }
  }
`;
