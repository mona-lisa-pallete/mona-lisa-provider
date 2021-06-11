import React, { useImperativeHandle, useMemo, useState, forwardRef, useEffect } from 'react';
import { ComponentFormProps } from './types';

const ComponentForm: React.FC<ComponentFormProps> = (props, ref: any) => {
  const [state, setState] = useState<number>();
  const { widgetMeta, onChange, initialValues, PlatformContext, id } = props;

  useEffect(() => {
    console.log(id, 'id', initialValues, '1');
    forceUpdate();
  }, [id]);

  const forceUpdate = () => {
    setState(new Date().getTime());
  };

  useImperativeHandle(ref, () => {
    return {
      forceUpdate,
    };
  });

  return useMemo(() => {
    console.log(initialValues, 'initialValues', '2');

    const hasMeta = !!widgetMeta;
    const FormComp = hasMeta
      ? window[widgetMeta.propFormConfig.customFormRef]?.default || 'div'
      : 'div';
    return hasMeta ? (
      <FormComp
        key={state}
        onChange={onChange}
        initialValues={initialValues}
        platformCtx={PlatformContext}
        id={id}
      />
    ) : null;
  }, [state]);
};

export default forwardRef(ComponentForm);
