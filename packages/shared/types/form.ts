import { ISchema } from './common';
import { IValue } from './response';

export interface IForm extends ISchema {
  name: string;
  slug: string;
  fields: IField[];
  settings: any;
}

export interface IFieldOptions {
  physicalQuantity: string;
  unit: string;
  default: boolean;
  selectItem: boolean;
  dependentRelationship: boolean;
  twoWayRelationship: boolean;
  relationLabel: string;
  relationFieldId: string;
  showOptionCreatedByUser: boolean;
  showOptionCreatedOnTemplate: boolean;
  required: boolean;
  multipleValues: boolean;
  unique: boolean;
  caseInsensitiveUnique: boolean;
  staticText: string;
  formField: string;
  showCommentBox: boolean;
  showStarRating: boolean;
  notEditable: boolean;
  systemCalculatedAndSaved: boolean;
  systemValue: any;
  systemCalculatedAndView: boolean;
  formula: IFormula;
  showAsCheckbox: boolean;
  selectAllowCreate: boolean;
  selectOptions: string[];
  grid?: any;
  style?: any;
  conditions: ICondition[];
  defaultValue: Partial<IValue>;
  tabField?: boolean;
  hidden?: boolean;
  hiddenCondition?: IHiddenCondition[];
}

export interface IField {
  _id: string;
  label: string;
  fieldType: string;
  template?: any;
  form?: any;
  options: IFieldOptions;
}

export interface IFormula {
  condition: string;
  variables: IFormulaVariable[];
}

export interface ICondition {
  operator: 'AND' | 'OR';
  formId: string;
  fieldId: string;
  conditionType: '==' | '!=';
  value: string;
  constantValue: string;
}

export interface IFormulaVariable {
  operation: 'add' | 'subtract' | 'divide' | 'multiply';
  value: 'brackets' | 'constantValue' | string;
  constantValue: number;
  variables: IFormulaVariable[];
}

export interface IHiddenCondition {
  field: string;
  conditionType: string;
  value: string;
  constantValue: string;
}
