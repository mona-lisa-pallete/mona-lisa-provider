export interface IAddPreviewRequest {
  page: string;
  dsl: string;
}

export interface IAddPreviewReponse {
  url: string;
}

export interface IAddPageRequest {
  page: string;
  dsl: any;
}

export interface IAddPageReponse {}

export interface IGetComponentsReponse {
  id: number;
  ref: string;
  label: string;
  cdnPath: string;
}
