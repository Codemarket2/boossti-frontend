import FormFields from './FormFields';

interface IProps {
  section: any;
  onSectionChange: any;
  authorized: boolean;
  title?: string;
}

export default function ResponseSections({ section, onSectionChange, authorized, title }: IProps) {
  return (
    <FormFields
      fields={section?.fields}
      setFields={(fields: any) => onSectionChange({ fields })}
      title={title || 'Sections'}
      previewMode={!authorized}
      isSection
    />
  );
}
