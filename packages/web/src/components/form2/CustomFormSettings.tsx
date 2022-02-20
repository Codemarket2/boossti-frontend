import { generateObjectId } from '@frontend/shared/utils/objectId';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormSetting from './FormSetting';
import InputGroup from '../common/InputGroup';
import Overlay from '../common/Overlay';
import ResponseLayout from '../response/ResponseLayout';

interface IProps {
  open: boolean;
  onClose: () => void;
  customSettings: boolean;
  settings: any;
  toggleCustomSettings: any;
  onSettingsChange: any;
}

export default function CustomFormSettings({
  open,
  onClose,
  customSettings,
  settings,
  toggleCustomSettings,
  onSettingsChange,
}: IProps): any {
  return (
    <Overlay title="Form Settings" open={open} onClose={onClose}>
      <InputGroup className="pl-2">
        <FormControlLabel
          label="Use custom form settings"
          control={
            <Switch
              color="primary"
              checked={customSettings}
              onChange={(e) => toggleCustomSettings(e.target.checked)}
            />
          }
        />
      </InputGroup>
      {customSettings && (
        <>
          <FormSetting
            settings={settings}
            onChange={(val) => onSettingsChange({ ...settings, ...val })}
          />
          <InputGroup className="pl-2">
            <FormControlLabel
              label="Use custom response layout"
              control={
                <Switch
                  color="primary"
                  checked={settings?.customResponseLayout}
                  onChange={(e) => {
                    let newSetting = { ...settings, customResponseLayout: e.target.checked };
                    if (!settings?.customSectionId && e.target.checked) {
                      newSetting = { ...newSetting, customSectionId: generateObjectId() };
                    }
                    onSettingsChange(newSetting);
                  }}
                />
              }
            />
          </InputGroup>
          {settings?.customSectionId && <ResponseLayout _id={settings?.customSectionId} />}
        </>
      )}
    </Overlay>
  );
}
