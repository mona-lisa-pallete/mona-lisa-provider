import PictureImg from '@/assets/img/component/pic.png';

enum ComponentType {
  Picture = 'Image',
  Button = 'Button',
  Text = 'Text',
}

// interface ComponentInfo {
//   name: string;
//   icon: string;
//   img: any;
// }

const ComponentMap = new Map<ComponentType, any>([
  [
    ComponentType.Picture,
    {
      name: '图片',
      icon: 'icon-pic',
      img: PictureImg,
    },
  ],
  [
    ComponentType.Button,
    {
      name: '按钮',
      icon: 'icon-button',
    },
  ],
  [
    ComponentType.Text,
    {
      name: '文本',
      icon: 'icon-Typography',
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
];

export { ComponentData, ComponentType, ComponentMap };
