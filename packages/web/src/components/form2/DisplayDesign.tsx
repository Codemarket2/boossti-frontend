import DisplayContentBox from '../contentbox/DisplayContentBox';
import { getValue } from './ResponseList';

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
        newValue = newValue?.split(`{{${variable.name}}}`).join(variableValue);
      }
    }
  });

  return <DisplayContentBox value={newValue} />;
}
