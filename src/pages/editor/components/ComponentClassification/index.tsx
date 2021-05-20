import React, { useEffect } from 'react';
import { ComponentMap, ComponentType } from '../../data';
import {
  ComponentClassificationContainer,
  ComponentClassificationItem,
  ComponentClassificationList,
  ComponentTabs,
} from './index.style';
import { ComponentClassificationProps } from './types';

function ComponentClassification(props: ComponentClassificationProps<ComponentType>) {
  const { value, data, onChange } = props;

  useEffect(() => {
    console.log(value);
  }, []);

  const handleVal = (val: ComponentType) => {
    onChange(val);
  };

  const Tab: any = ComponentMap.get(value)?.node as React.Component;

  return (
    <ComponentClassificationContainer>
      <ComponentClassificationList>
        {data.map((i) => {
          return (
            <ComponentClassificationItem
              onClick={() => {
                handleVal(i.type);
              }}
              className={value === i.type ? 'component-classification--active' : ''}
            >
              <i className={`${ComponentMap.get(i.type)?.icon} iconfont`} />
              {ComponentMap.get(i.type)?.name}
            </ComponentClassificationItem>
          );
        })}
      </ComponentClassificationList>
      <ComponentTabs>
        <Tab />
      </ComponentTabs>
    </ComponentClassificationContainer>
  );
}

export default ComponentClassification;