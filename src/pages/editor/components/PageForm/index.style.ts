import { Input, Radio } from 'antd';
import styled from 'styled-components';

export const RadioGroup = styled(Radio.Group)`
  display: flex;
  .ant-radio-button-wrapper {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 0;
  }
`;

export const TextInput = styled(Input.TextArea)`
  border-radius: 4px;
  border: 1px solid #c0c2cc;
`;
