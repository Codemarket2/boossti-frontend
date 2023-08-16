import { IMedia, ISchema } from './common';
import { IForm } from './form';

export interface IResponse extends ISchema {
  formId: any;
  workflowId?: string;
  parentResponseId?: string;
  appId: string;
  count: number;
  values: IValue[];
  options?: any;
}

// export interface IVariables {
//   name: string;
//   field: string;
//   formId: string;
// }

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
  form: IForm | string | any;
  options: any;
  media: IMedia[];
  // variables: IVariables[];
}
