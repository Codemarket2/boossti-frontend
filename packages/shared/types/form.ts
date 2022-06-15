export interface IForm {
  _id: string;
  fields: IField[];
  setings: any;
}

export interface IFieldOptions {
  default: boolean;
  dependentRelation: boolean;
  selectItem: boolean;
  dataSource: string;
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
  showAsCheckbox: boolean;
  selectAllowCreate: boolean;
  selectOptions: string[];
}

export interface IField {
  _id: string;
  label: string;
  fieldType: string;
  template: any;
  form: any;
  options: IFieldOptions;
}
