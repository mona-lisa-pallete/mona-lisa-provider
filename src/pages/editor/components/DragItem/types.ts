export interface DragItemProps {
  style?: React.CSSProperties;
  id: number | string;
  onSelect: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  active: boolean;
  // isDrag: boolean;
}
