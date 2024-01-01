type FormFieldType = {
  label: 'Form';
  value: 'form';
};

type FormFieldFieldType = {
  label: 'Form Field';
  value: 'formField';
};

type FormResponseType = {
  label: 'Form Response';
  value: 'response';
};

type TextType = {
  label: 'Text';
  value: 'text';
};

type NumberType = {
  label: 'Number';
  value: 'number';
};

type PasswordType = {
  label: 'Password';
  value: 'password';
};

type TextareaType = {
  label: 'Textarea';
  value: 'textarea';
};

type RichTextareaType = {
  label: 'Rich Textarea';
  value: 'richTextarea';
};

type BooleanType = {
  label: 'Boolean';
  value: 'boolean';
};
type EmailType = {
  label: 'Email';
  value: 'email';
};
type PhoneNumberType = {
  label: 'Phone Number';
  value: 'phoneNumber';
};
type DateType = {
  label: 'Date';
  value: 'date';
};
type DateandTimeType = {
  label: 'Date & Time';
  value: 'dateTime';
};
type ImageType = {
  label: 'Image';
  value: 'image';
};
type FileType = {
  label: 'File';
  value: 'file';
};
type AddressType = {
  label: 'Address';
  value: 'address';
};
type StaticTextType = {
  label: 'Static Text';
  value: 'label';
};
type LinkType = {
  label: 'Link';
  value: 'link';
};
type ColorPickerType = {
  label: 'Color Picker';
  value: 'colorPicker';
};
type BarcodeScannerType = {
  label: 'Barcode Scanner';
  value: 'barcodeScanner';
};
type LightHouseReportType = {
  label: 'Lighthouse Report';
  value: 'lighthouseReport';
};
type BoardType = {
  label: 'Board';
  value: 'board';
};
type DiagramType = {
  label: 'Diagram';
  value: 'diagram';
};
type FlowDiagramType = {
  label: 'Flow Diagram';
  value: 'flowDiagram';
};
type ConditionType = {
  label: 'Condition';
  value: 'condition';
};
type Webpage = {
  label: 'Webpage';
  value: 'webpage';
};
type SignatureType = {
  label: 'Signature';
  value: 'signature';
};
type CardType = {
  label: 'Card';
  value: 'card';
};
type CraftJs = {
  label: 'CraftJS';
  value: 'craftjs';
};
type ReactGridLayout = {
  label: 'ReactGridLayout';
  value: 'reactgridlayout';
};
type ReactGridLayoutEditor = {
  label: 'ReactGridLayoutEditor';
  value: 'ReactGridLayoutEditor';
};
export type TFieldType =
  | FormFieldType
  | FormFieldFieldType
  | FormResponseType
  | TextType
  | NumberType
  | PasswordType
  | TextareaType
  | RichTextareaType
  | BooleanType
  | EmailType
  | PhoneNumberType
  | DateType
  | DateandTimeType
  | ImageType
  | FileType
  | AddressType
  | StaticTextType
  | LinkType
  | ColorPickerType
  | BarcodeScannerType
  | LightHouseReportType
  | BoardType
  | DiagramType
  | FlowDiagramType
  | ConditionType
  | SignatureType
  | Webpage
  | CardType
  | CraftJs
  | ReactGridLayout
  | ReactGridLayoutEditor;

export const getFormFieldTypes = (isWidget: boolean): TFieldType[] => {
  if (isWidget) {
    return templateWidgetTypes;
  }
  return fieldTypes;
};

export const templateWidgetTypes: TFieldType[] = [
  { label: 'Form', value: 'form' },
  { label: 'Form Response', value: 'response' },
];

export const fieldTypes: TFieldType[] = [
  ...templateWidgetTypes,
  { label: 'Form Field', value: 'formField' },
  { label: 'Text', value: 'text' },
  { label: 'Number', value: 'number' },
  { label: 'Password', value: 'password' },
  { label: 'Textarea', value: 'textarea' },
  { label: 'Rich Textarea', value: 'richTextarea' },
  { label: 'Boolean', value: 'boolean' },
  // { label: 'Select', value: 'select' },
  { label: 'Email', value: 'email' },
  { label: 'Phone Number', value: 'phoneNumber' },
  { label: 'Date', value: 'date' },
  { label: 'Date & Time', value: 'dateTime' },
  // { label: 'Image', value: 'image' },
  { label: 'File', value: 'file' },
  // { label: 'Media (Images/Video)', value: 'media' },
  { label: 'Address', value: 'address' },
  { label: 'Static Text', value: 'label' },
  { label: 'Link', value: 'link' },
  { label: 'Color Picker', value: 'colorPicker' },
  { label: 'Barcode Scanner', value: 'barcodeScanner' },
  { label: 'Lighthouse Report', value: 'lighthouseReport' },
  { label: 'Board', value: 'board' },
  { label: 'Diagram', value: 'diagram' },
  { label: 'Flow Diagram', value: 'flowDiagram' },
  { label: 'Condition', value: 'condition' },
  { label: 'Webpage', value: 'webpage' },
  { label: 'Signature', value: 'signature' },
  { label: 'Card', value: 'card' },
  { label: 'CraftJS', value: 'craftjs' },
  { label: 'ReactGridLayout', value: 'reactgridlayout' },
  { label: 'ReactGridLayoutEditor', value: 'ReactGridLayoutEditor' },
];
