import { CSSProperties } from 'styled-components';

export interface DragItemProps {
  left: CSSProperties['left'];
  top: CSSProperties['top'];
  style: React.CSSProperties;
  id: number | string;
  onSelect: () => void;
  active: boolean;
}
