import DisplayContentBox from '../contentbox/DisplayContentBox';

interface IProps {
  value: string;
  variables?: any[];
  responseValues?: any;
  fields?: any;
}

export default function DisplayDesign({
  value,
  variables = [],
  responseValues = [],
  fields,
}: IProps) {
  let newValue = value;
  variables?.forEach((variable) => {
    const field = fields?.filter((f) => f._id === variable.field)[0];
    if (field) {
      const variableValue = getValue(field, responseValues);
      if (variableValue) {
        newValue = newValue
          ?.split(field.fieldType === 'image' ? variable.name : `{{${variable.name}}}`)
          .join(variableValue);
      }
    }
  });
  return <DisplayContentBox value={newValue} />;
}

const getValue = (field, values) => {
  const value = values.filter((v) => v.field === field._id)[0];
  if (!value) {
    return null;
  }
  switch (field.fieldType) {
    case 'text':
    case 'textarea':
    case 'url':
    case 'select':
    case 'email':
    case 'password':
      return value?.value;
    case 'date':
    case 'dateTime':
      return value?.valueDate;
    case 'number':
    case 'phoneNumber':
      return value?.valueNumber;
    case 'checkbox':
      return value?.valueBoolean;
    case 'image':
      return value?.media[0]?.url;
    default:
      return null;
  }
};
