import React, { useEffect } from 'react';
import { ComponentMap, ComponentType } from '../../data';
import {
  ComponentClassificationContainer,
  ComponentClassificationItem,
  ComponentClassificationList,
  ComponentTabs,
} from './index.style';
import { ComponentClassificationProps } from './types';
import ComponentTab from '../ComponentTab/index';

function ComponentClassification(props: ComponentClassificationProps<ComponentType>) {
  const { value, data, onChange, componentMap } = props;

  useEffect(() => {
    // console.log(value);
  }, []);

  const handleVal = (val: ComponentType) => {
    onChange(val);
  };

  const tabData = componentMap[value] || [];

  return (
    <ComponentClassificationContainer>
      <ComponentClassificationList>
        {data.map((i, idx) => {
          return (
            <ComponentClassificationItem
              key={idx}
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
        {tabData.map((i, index) => {
          return (
            <ComponentTab
              key={index}
              img={i.componentMeta.logo}
              label={i.componentMeta.label}
              name={i.componentMeta.elementRef}
            />
          );
        })}
      </ComponentTabs>
    </ComponentClassificationContainer>
  );
}

export default ComponentClassification;
