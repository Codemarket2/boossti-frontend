// CRAFTJS
import { useNode } from '@craftjs/core';

// SHARED
import { getFormBySlug } from '@frontend/shared/hooks/form';
import { useEffect } from 'react';

// WEB
import { DisplayForm, IDisplayFormProps } from '../../../form2/DisplayForm';
import FormDisplaySettings from './FormDisplaySettings';

interface FormDispalyProps {
  formId: string;
  settings: IDisplayFormProps['settings'];
}

const FormDispaly = ({ formId, settings }: FormDispalyProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <DisplayForm _id={formId} settings={settings} />
    </div>
  );
};

FormDispaly.craft = {
  related: {
    settings: FormDisplaySettings,
  },
};

export default FormDispaly;
