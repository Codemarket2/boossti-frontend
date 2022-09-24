import { IMedia, ISchema } from './common';
import { IForm } from './form';

export interface IResponse extends ISchema {
  formId: any;
  appId: string;
  instanceId: string;
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
  response: string | IResponse | any;
  form: string | IForm;
  options: any;
  media: IMedia[];
}
