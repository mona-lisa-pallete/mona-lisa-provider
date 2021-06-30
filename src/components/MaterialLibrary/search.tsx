import React, { useState, forwardRef, useImperativeHandle, ForwardedRef } from 'react';
import { Input, Switch, Button } from 'antd';
import { useDebounce } from 'react-use';
import {
  SeachContainer,
  SeachInputContainer,
  SeachActionContainer,
  SeachSwitchContainer,
} from './index.style';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useModel } from 'umi';

interface SeachProps {
  onChange: (seach: string, mine: boolean) => void;
  placeholder: string;
  btnName?: string;
  onClickBtn?: () => void;
}

const Seach = (props: SeachProps, ref: ForwardedRef<unknown>) => {
  const [value, setValue] = useState('');
  const [mine, setMine] = useState(false);
  const { onChange, placeholder = '', btnName = '上传素材', onClickBtn } = props;
  const { setUploadNewWindow } = useModel('useCommonModel');

  // useDebounce(
  //   () => {
  //     onChange(value, mine);
  //   },
  //   300,
  //   [value, mine],
  // );

  useImperativeHandle(ref, () => {
    return {
      reset() {
        setValue('');
        setMine(false);
      },
    };
  });

  return (
    <SeachContainer>
      <SeachInputContainer>
        <Input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          allowClear
          style={{
            height: '28px',
          }}
          suffix={<SearchOutlined style={{ color: '#8E91A3' }} />}
          placeholder={placeholder}
        />
      </SeachInputContainer>
      <SeachActionContainer>
        <Button
          type="primary"
          icon={<PlusOutlined style={{ fontSize: '16px', marginRight: '4px' }} />}
          onClick={() => {
            if (onClickBtn) {
              onClickBtn();
              return;
            }
            setUploadNewWindow();
          }}
        >
          {btnName}
        </Button>
        <SeachSwitchContainer
          onClick={(e) => {
            setMine(!mine);
            onChange(value, mine);
          }}
        >
          <div className="switch-text">只看我创建的</div>
          <Switch
            checked={mine}
            size="small"
            onChange={(checked) => {
              // setMine(checked);
            }}
          />
        </SeachSwitchContainer>
      </SeachActionContainer>
    </SeachContainer>
  );
};

export default forwardRef(Seach);
