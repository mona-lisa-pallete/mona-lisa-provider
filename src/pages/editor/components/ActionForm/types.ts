export enum ActionType {
  Toast = 'toast',
  Modal = 'modal',
  Page = 'page',
}

export enum PageType {
  WebPage = 'openPage',
  H5 = 'openH5',
  Mini = 'openMini',
}

interface PageItem {
  name: string;
  value: string;
}

interface ModalItem {
  name: string;
  value: string;
}

export interface ActionFormProps {
  pageData: PageItem[];
  modalData: ModalItem[];
}
