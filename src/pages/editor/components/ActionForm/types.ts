export enum ActionType {
  Toast = 'toast',
  Modal = 'modal',
  Page = 'page',
}

export enum PageType {
  WebPage = 'webPage',
  H5 = 'h5',
  Mini = 'mini',
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
