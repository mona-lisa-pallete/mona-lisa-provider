import { Popover } from 'antd';
import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import './index.less';

interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
  const [color, setColor] = useState({ r: 122, g: 59, b: 59, a: 0.5 });
  return (
    <div className="color-picker">
      <i className="icon-Typographycolor iconfont" />
      <Popover
        trigger="click"
        content={
          <SketchPicker
            color={color}
            onChange={(colorCode) => {
              onChange &&
                onChange(
                  `rgba(${colorCode.rgb.r}, ${colorCode.rgb.g}, ${colorCode.rgb.b}, ${colorCode.rgb.a})`,
                );
              setColor({
                ...colorCode.rgb,
                a: colorCode.rgb?.a || 1,
              });
            }}
          />
        }
      >
        <div className="color-val" style={{ background: value || '#1D1D1D' }} />
      </Popover>
    </div>
  );
};
export default ColorPicker;
