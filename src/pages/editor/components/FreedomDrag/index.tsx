import React, { useEffect, useRef, useState } from 'react';
import Dragdrop from '@/lib/drag';
import { useDebounce } from 'react-use';
import { CSSProperties } from 'styled-components';

interface FreedomDragProps {
  onSelect: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  zIndex: CSSProperties['zIndex'];
  activeRef: string;
  onChangeStyle: (style: { moveX: number; moveY: number }) => void;
  isDrag: boolean;
}
const FreedomDrag: React.FC<FreedomDragProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  // const mouseRef = useRef<boolean>(false);
  const [drag, setDrag] = useState<{ moveX: number; moveY: number }>();
  const { onSelect, zIndex, activeRef, onChangeStyle, isDrag = false } = props;

  useDebounce(
    () => {
      if (drag?.moveX) {
        onChangeStyle(drag!);
      }
    },
    200,
    [drag],
  );

  useEffect(() => {
    if (!isDrag) {
      return;
    }
    let dragdrop: any = null;
    // const mousedown = (e: MouseEvent) => {
    //   onSelect(e);
    // };
    console.log(ref.current?.firstChild?.id, 'dddddddd');
    if (ref.current?.firstChild?.id === activeRef) {
      // if (!mouseRef.current) {
      //   ref.current.addEventListener('mousedown', mousedown);
      //   mouseRef.current = true;
      // }
      // eslint-disable-next-line no-new
      dragdrop = new Dragdrop({
        target: ref.current,
        callback(obj: any) {
          setDrag(obj);
        },
      });
    }
    return () => {
      if (dragdrop) {
        dragdrop.destroy();
      }
    };
  }, [activeRef]);

  return (
    <div
      style={{
        position: isDrag ? 'absolute' : 'static',
        zIndex,
      }}
      onMouseDown={() => {
        console.log(1111);
      }}
      ref={ref}
      onClick={onSelect}
    >
      {props.children}
    </div>
  );
};
export default FreedomDrag;
