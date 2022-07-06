import { IMedia, ISchema } from './common';

export interface IResponse extends ISchema {
  formId: any;
  appId: string;
  installId: string;
  count: number;
  values: IValue[];
}

export interface IValue {
  _id: string;
  field: string;
  value: string;
  valueNumber: number;
  valueBoolean: boolean;
  valueDate: Date;
  values: string[];
  template: string;
  page: string;
  response: string;
  form: string;
  options: any;
  media: IMedia[];
}
