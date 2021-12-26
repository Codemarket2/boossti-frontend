import { useUpdateListType } from '@frontend/shared/hooks/list';
import { onAlert } from '../../utils/alert';
import FormFields from '../form2/FormFields';

interface IProps {
  listType: any;
}

export default function ListTypeFields({ listType }: IProps) {
  const { onFieldsChange } = useUpdateListType({ listType, onAlert });
  return (
    <div>
      <FormFields fields={listType?.fields} setFields={onFieldsChange} title="Sections" />
    </div>
  );
}
