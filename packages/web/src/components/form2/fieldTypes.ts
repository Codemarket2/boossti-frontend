export const getFormFieldTypes = (isSection: boolean): FieldType[] => {
  if (isSection) {
    return sectionFieldTypes;
  }
  return fieldTypes;
};

type FieldType = {
  label: string;
  value: string;
};

export const sectionFieldTypes: FieldType[] = [{ label: 'Form', value: 'form' }];

export const fieldTypes: FieldType[] = [
  { label: 'Text', value: 'text' },
  { label: 'Number', value: 'number' },
  { label: 'Password', value: 'password' },
  { label: 'Textarea', value: 'textarea' },
  { label: 'Rich Textarea', value: 'richTextarea' },
  { label: 'Checkbox', value: 'checkbox' },
  { label: 'Select', value: 'select' },
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
];
