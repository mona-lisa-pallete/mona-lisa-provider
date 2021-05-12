import React, { useReducer, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ComponentList from './components/ComponentList';
import ViewportBox from './components/Viewport';
import EditorContext from './context';
import reducer from './reducer';
import { Button, Input } from 'antd';
import { addPage, addPreviewPage } from '@/services/editor';

export const initState = {
  componentList: [],
};

const Editor: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const [json, setJson] = useState('');

  const submit = async () => {
    const res = await addPreviewPage({
      dsl: JSON.stringify(json),
      pageId: '1',
    });
    if (res?.data?.url) {
      window.open(res.data.url);
    }
  };

  const save = async () => {
    await addPage({
      dsl: JSON.stringify(json),
      pageId: '1',
    });
  };

  return (
    <EditorContext.Provider value={{ dispatch, state }}>
      <DndProvider backend={HTML5Backend}>
        <ComponentList />
        <ViewportBox />
        <div
          style={{
            width: '300px',
            height: '400px',
            verticalAlign: 'top',
            display: 'inline-block',
          }}
        >
          <Input.TextArea
            style={{
              height: '400px',
            }}
            value={json}
            onChange={(e) => {
              setJson(e.target.value);
            }}
          />
          <Button onClick={submit}>预览</Button>
          <Button onClick={save}>保存</Button>
        </div>
      </DndProvider>
    </EditorContext.Provider>
  );
};

export default Editor;
