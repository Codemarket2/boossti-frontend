import { useUpdatePageFields } from '@frontend/shared/hooks/template';
import { onAlert } from '../../utils/alert';
import FormFields from '../form2/FormFields';

interface IProps {
  page: any;
  previewMode?: boolean;
}

export default function PageFields({ page, previewMode }: IProps) {
  const { onPageChange } = useUpdatePageFields({ page, onAlert });
  return (
    <FormFields
      fields={page?.fields || []}
      setFields={(fields) => onPageChange({ fields })}
      title="Sections"
      isSection
      previewMode={previewMode}
    />
  );
}
