const Menus: MenusOptions[] = [
  {
    title: '落地页项目管理',
    // entry_dev: '//localhost:8100',
    path: '/project',
  },
  {
    title: '素材管理',
    path: '/material-manage',
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
