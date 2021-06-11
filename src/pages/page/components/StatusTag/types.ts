export interface StatusTagProps {
  type: PageStatusType;
  edit?: boolean;
  onChangeStatus?: (status: PageStatusType) => void;
}

export enum PageStatusType {
  Online = 'online',
  Deploy = 'deploy',
  Audit = 'audit',
  Offline = 'offline',
}
