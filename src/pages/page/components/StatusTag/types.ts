export interface StatusTagProps {
  type: StatusType;
  edit?: boolean;
}

export enum StatusType {
  Primary = 'primary',
  Warning = 'warning',
  Success = 'success',
}
