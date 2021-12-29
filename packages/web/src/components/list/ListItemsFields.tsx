import { useUpdateListItemFields } from '@frontend/shared/hooks/list';
import { onAlert } from '../../utils/alert';
import FormFields from '../form2/FormFields';

interface IProps {
  listItem: any;
}

export default function ListTypeFields({ listItem }: IProps) {
  const { onFieldsChange } = useUpdateListItemFields({ listItem, onAlert });
  return (
    <div>
      <FormFields fields={listItem?.fields || []} setFields={onFieldsChange} title="Sections" />
    </div>
  );
}
