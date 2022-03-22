import { useUpdateTemplate } from '@frontend/shared/hooks/template';
import { onAlert } from '../../utils/alert';
import FormFields from '../form2/FormFields';

interface IProps {
  template: any;
  previewMode?: boolean;
}

export default function TemplateFields({ template, previewMode }: IProps) {
  const { onTemplateChange } = useUpdateTemplate({ template, onAlert });
  return (
    <div>
      <FormFields
        fields={template?.fields}
        setFields={(fields) => onTemplateChange({ fields })}
        title="Widgets"
        showDisplaySettings
        previewMode={previewMode}
        isSection
      />
    </div>
  );
}
