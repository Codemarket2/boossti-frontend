import { useUpdateListItemFields } from '@frontend/shared/hooks/list';
import { onAlert } from '../../utils/alert';
import FormFields from '../form2/FormFields';

interface IProps {
  listItem: any;
  previewMode?: boolean;
}

export default function ListItemFields({ listItem, previewMode }: IProps) {
  const { onListItemChange } = useUpdateListItemFields({ listItem, onAlert });
  return (
    <FormFields
      fields={listItem?.fields || []}
      setFields={(fields) => onListItemChange({ fields })}
      title="Sections"
      isSection
      previewMode={previewMode}
    />
  );
}
