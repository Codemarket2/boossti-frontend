export const getFormFieldTypes = (isWidget: boolean): FieldType[] => {
  if (isWidget) {
    return templateWidgetTypes;
  }
  return fieldTypes;
};

type FieldType = {
  label: string;
  value: string;
};

export const templateWidgetTypes: FieldType[] = [
  { label: 'Form', value: 'form' },
  { label: 'Template', value: 'template' },
];

export const fieldTypes: FieldType[] = [
  { label: 'Existing Form', value: 'existingForm' },
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
  { label: 'Image', value: 'image' },
  { label: 'File', value: 'file' },
  // { label: 'Media (Images/Video)', value: 'media' },
  { label: 'Address', value: 'address' },
  { label: 'Static Text', value: 'label' },
  { label: 'Link', value: 'link' },
  { label: 'Color Picker', value: 'colorPicker' },
  { label: 'Barcode Scanner', value: 'barcodeScanner' },
  { label: 'Lighthouse Report', value: 'lighthouseReport' },
];

export const selectOptionsTypes = [
  { label: 'Existing Template', value: 'template' },
  ...fieldTypes?.filter((t) => t.value !== 'select'),
];
