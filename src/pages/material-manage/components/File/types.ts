import { MaterialType } from '../../types';

export interface FileMaterialProps {
  onPreview: (
    selectedIndex: number,
    data: Array<{ url: string; type: MaterialType; id: number }>,
    visible: boolean,
  ) => void;
  onChangeName: (name: string, id: number) => void;
  onDelMaterial: (id: number | string) => void;
}

export interface FileRef {
  reload: () => (resetPageIndex?: boolean | undefined) => void;
}

export const MIME: { [key: string]: string } = {
  doc: 'application/msword',
  dot: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  dotx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
  docm: 'application/vnd.ms-word.document.macroEnabled.12',
  dotm: 'application/vnd.ms-word.template.macroEnabled.12',
  xls: 'application/vnd.ms-excel',
  xlt: 'application/vnd.ms-excel',
  xla: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  xltx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
  xlsm: 'application/vnd.ms-excel.sheet.macroEnabled.12',
  xltm: 'application/vnd.ms-excel.template.macroEnabled.12',
  xlam: 'application/vnd.ms-excel.addin.macroEnabled.12',
  xlsb: 'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
  ppt: 'application/vnd.ms-powerpoint',
  pot: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  potx: 'application/vnd.openxmlformats-officedocument.presentationml.template',
  ppsx: 'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
  pdf: 'application/pdf',
};
