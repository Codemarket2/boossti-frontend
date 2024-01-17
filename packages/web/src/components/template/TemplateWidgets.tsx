import { useUpdateTemplate } from '@frontend/shared/hooks/template';
import { onAlert } from '../../utils/alert';
import FormFields from '../form2/FormFields';

interface IProps {
  template: any;
  previewMode?: boolean;
  selectedWidget?: string;
}

export default function TemplateWidgets({ template, previewMode, selectedWidget }: IProps) {
  const { onTemplateChange } = useUpdateTemplate({ template, onAlert });
  return (
    <FormFields
      fields={template?.fields}
      setFields={(fields) => onTemplateChange({ fields })}
      title="Widgets"
      previewMode={previewMode}
      isWorkflow
      showWidgetExpand
      // selectedField={selectedWidget}
    />
  );
}
