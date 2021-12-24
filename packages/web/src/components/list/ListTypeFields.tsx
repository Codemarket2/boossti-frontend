import { useState } from 'react';
import FormFields from '../form2/FormFields';

export default function ListTypeFields() {
  const [fields, setFields] = useState([]);
  return (
    <div>
      <FormFields fields={fields} setFields={setFields} title="Sections" />
    </div>
  );
}
