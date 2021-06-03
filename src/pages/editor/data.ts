import PictureImg from '@/assets/img/component/pic.png';

enum ComponentType {
  Picture = 'Image',
  Button = 'Button',
  Text = 'Text',
  Video = 'video',
  Document = 'document',
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
  [
    ComponentType.Video,
    {
      name: '视频',
      icon: 'icon-video',
    },
  ],
  [
    ComponentType.Document,
    {
      name: '文档',
      icon: 'icon-file',
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
    type: ComponentType.Video,
    node: 2,
  },
  {
    type: ComponentType.Document,
    node: 2,
  },
];

export { ComponentData, ComponentType, ComponentMap };
