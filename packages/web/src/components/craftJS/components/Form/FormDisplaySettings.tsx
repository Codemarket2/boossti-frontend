import { useEffect, useState } from 'react';

// CRAFTJS
import { useNode } from '@craftjs/core';

// WEB
import FormSettings from '../../../form2/FormSetting';

type FormSettingsProps = Parameters<typeof FormSettings>[0];

const FormDisplaySettings = () => {
  const {
    actions: { setProp },
    settingProp,
    formId,
  } = useNode((node) => {
    return { formId: node.data.props._id, settingProp: node.data.props.settings || {} };
  });

  const [settings, setSettings] = useState<FormSettingsProps['settings']>(settingProp);

  const onChange: FormSettingsProps['onChange'] = (newSetting) => {
    setSettings((prev) => ({ ...prev, ...newSetting }));
  };

  useEffect(() => {
    setProp((props: any) => {
      // eslint-disable-next-line no-param-reassign
      props.settings = settings;
    });
  }, [settings]);

  return (
    <div>
      <FormSettings onChange={onChange} settings={settings} formId={undefined} />
    </div>
  );
};

export default FormDisplaySettings;
