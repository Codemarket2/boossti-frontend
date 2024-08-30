export enum FieldTypeEnum {
  Form = 'form',
  FormField = 'formField',
  FormResponse = 'response',
  FormResponseDisplay = 'formResponseDisplay',
  Text = 'text',
  Number = 'number',
  Password = 'password',
  Textarea = 'textarea',
  RichTextarea = 'richTextarea',
  Boolean = 'boolean',
  Email = 'email',
  PhoneNumber = 'phoneNumber',
  Date = 'date',
  DateTime = 'dateTime',
  Image = 'image',
  File = 'file',
  Address = 'address',
  StaticText = 'label',
  Link = 'link',
  ColorPicker = 'colorPicker',
  BarcodeScanner = 'barcodeScanner',
  LighthouseReport = 'lighthouseReport',
  Board = 'board',
  Diagram = 'diagram',
  FlowDiagram = 'flowDiagram',
  Condition = 'condition',
  Webpage = 'webpage',
  Signature = 'signature',
  Card = 'card',
  CraftJs = 'craftjs',
  ReactGridLayout = 'reactgridlayout',
}

// Type for field type with label
type TFieldType = {
  label: string;
  value: FieldTypeEnum;
};

// Function to get form field types
export const getFormFieldTypes = (isWidget: boolean): TFieldType[] => {
  if (isWidget) {
    return templateWidgetTypes;
  }
  return fieldTypes;
};

// Template widget types
export const templateWidgetTypes: TFieldType[] = [
  { label: 'Form', value: FieldTypeEnum.Form },
  { label: 'Form Response', value: FieldTypeEnum.FormResponse },
  { label: 'Form Response Display', value: FieldTypeEnum.FormResponseDisplay },
];

// All field types
export const fieldTypes: TFieldType[] = [
  ...templateWidgetTypes,
  { label: 'Form Field', value: FieldTypeEnum.FormField },
  { label: 'Text', value: FieldTypeEnum.Text },
  { label: 'Number', value: FieldTypeEnum.Number },
  { label: 'Password', value: FieldTypeEnum.Password },
  { label: 'Textarea', value: FieldTypeEnum.Textarea },
  { label: 'Rich Textarea', value: FieldTypeEnum.RichTextarea },
  { label: 'Boolean', value: FieldTypeEnum.Boolean },
  { label: 'Email', value: FieldTypeEnum.Email },
  { label: 'Phone Number', value: FieldTypeEnum.PhoneNumber },
  { label: 'Date', value: FieldTypeEnum.Date },
  { label: 'Date & Time', value: FieldTypeEnum.DateTime },
  { label: 'File', value: FieldTypeEnum.File },
  { label: 'Address', value: FieldTypeEnum.Address },
  { label: 'Static Text', value: FieldTypeEnum.StaticText },
  { label: 'Link', value: FieldTypeEnum.Link },
  { label: 'Color Picker', value: FieldTypeEnum.ColorPicker },
  { label: 'Barcode Scanner', value: FieldTypeEnum.BarcodeScanner },
  { label: 'Lighthouse Report', value: FieldTypeEnum.LighthouseReport },
  { label: 'Board', value: FieldTypeEnum.Board },
  { label: 'Diagram', value: FieldTypeEnum.Diagram },
  { label: 'Flow Diagram', value: FieldTypeEnum.FlowDiagram },
  { label: 'Condition', value: FieldTypeEnum.Condition },
  { label: 'Webpage', value: FieldTypeEnum.Webpage },
  { label: 'Signature', value: FieldTypeEnum.Signature },
  { label: 'Card', value: FieldTypeEnum.Card },
  { label: 'CraftJS', value: FieldTypeEnum.CraftJs },
  { label: 'ReactGridLayout', value: FieldTypeEnum.ReactGridLayout },
];
