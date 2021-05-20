import React from 'react';
import { PictureTab } from './components/ComponentTab/';

enum ComponentType {
  Picture = 'picture',
  Button = 'button',
  Text = 'text',
  Modal = 'modal',
}

interface ComponentInfo {
  name: string;
  icon: string;
  node: React.Component;
}

const ComponentMap = new Map<ComponentType, ComponentInfo>([
  [
    ComponentType.Picture,
    {
      name: '图片',
      icon: 'icon-pic',
      node: PictureTab,
    },
  ],
  [
    ComponentType.Button,
    {
      name: '按钮',
      icon: 'icon-button',
      node: PictureTab,
    },
  ],
  [
    ComponentType.Text,
    {
      name: '文本',
      icon: 'icon-Typography',
      node: PictureTab,
    },
  ],
  [
    ComponentType.Modal,
    {
      name: '按钮',
      icon: 'icon-Dialog',
      node: PictureTab,
    },
  ],
]);

const ComponentData = [
  {
    type: ComponentType.Picture,
    node: 2,
  },
  {
    type: ComponentType.Button,
    node: 2,
  },
  {
    type: ComponentType.Text,
    node: 2,
  },
  {
    type: ComponentType.Modal,
    node: 2,
  },
];

export { ComponentData, ComponentType, ComponentMap };