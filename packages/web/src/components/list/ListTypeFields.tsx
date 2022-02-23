import { useUpdateListType } from '@frontend/shared/hooks/list';
import { onAlert } from '../../utils/alert';
import FormFields from '../form2/FormFields';

interface IProps {
  listType: any;
  previewMode?: boolean;
}

export default function ListTypeFields({ listType, previewMode }: IProps) {
  const { onFieldsChange } = useUpdateListType({ listType, onAlert });
  return (
    <div>
      <FormFields
        fields={listType?.fields}
        setFields={onFieldsChange}
        title="Sections"
        previewMode={previewMode}
        isSection
      />
    </div>
  );
}
