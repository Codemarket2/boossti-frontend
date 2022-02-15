import FormFields from './FormFields';

interface IProps {
  section: any;
  onSectionChange: any;
  authorized: boolean;
}

export default function ResponseSections({ section, onSectionChange, authorized }: IProps) {
  return (
    <FormFields
      fields={section?.fields}
      setFields={(fields: any) => onSectionChange({ fields })}
      title="Sections"
      previewMode={!authorized}
      isSection
    />
  );
}
