const Menus: MenusOptions[] = [
  {
    title: '目录1',
    // entry_dev: '//localhost:8100',
    path: '/',
    children: [
      {
        title: '子菜单1',
        path: '/sub-item',
      },
      {
        title: '子菜单2',
        path: '/sub-item2',
      },
    ],
  },
];
interface MenusOptions {
  title: string;
  name?: string;
  entry_dev?: string;
  path?: string;
  children?: MenusOptions[];
}

export default Menus;
