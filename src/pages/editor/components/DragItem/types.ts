export interface DragItemProps {
  // left: CSSProperties['left'];
  // top: CSSProperties['top'];
  style: React.CSSProperties;
  id: number | string;
  onSelect: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  active: boolean;
}
