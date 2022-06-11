import FormFields from '../form2/FormFields';

interface IProps {
  section: any;
  onSectionChange: any;
  authorized: boolean;
  title?: string;
  parentPageFields?: any;
}

export default function ResponseSections({
  section,
  onSectionChange,
  authorized,
  title = 'Sections',
  parentPageFields = [],
}: IProps) {
  return (
    <FormFields
      fields={section?.fields}
      setFields={(fields: any) => onSectionChange({ fields })}
      title={title}
      previewMode={!authorized}
      isSection
      parentPageFields={parentPageFields}
    />
  );
}
