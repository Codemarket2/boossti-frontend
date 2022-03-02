import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { generateObjectId } from '@frontend/shared/utils/objectId';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useState } from 'react';
import FormSetting from './FormSetting';
import InputGroup from '../common/InputGroup';
import Overlay from '../common/Overlay';
import ResponseLayout from '../response/ResponseLayout';
import { ActionsWrapper } from './Actions';

interface IProps {
  formId: string;
  open: boolean;
  onClose: () => void;
  settings: any;
  onSettingsChange: (settings: any) => void;
}

export default function CustomFormSettings({
  formId,
  open,
  onClose,
  settings,
  onSettingsChange,
}: IProps): any {
  const [tab, setTab] = useState('settings');
  return (
    <Overlay title="Form Settings" open={open} onClose={onClose}>
      <InputGroup className="pl-2">
        <FormControlLabel
          label="Use custom form settings"
          control={
            <Switch
              color="primary"
              checked={settings?.active}
              onChange={(e) => onSettingsChange({ ...settings, active: e.target.checked })}
            />
          }
        />
      </InputGroup>
      {settings?.active && (
        <>
          <Tabs
            variant="fullWidth"
            value={tab}
            indicatorColor="primary"
            textColor="primary"
            onChange={(event, newValue) => setTab(newValue)}
          >
            <Tab label="Settings" value="settings" />
            <Tab label="Actions" value="actions" />
            <Tab label="Workflows" value="workflows" />
          </Tabs>
          {tab === 'settings' && (
            <FormSetting
              settings={settings}
              onChange={(val) => onSettingsChange({ ...settings, ...val })}
            />
          )}
          {tab === 'workflows' && (
            <>
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
          {tab === 'actions' && (
            <ActionsWrapper
              formId={formId}
              settings={settings}
              onChange={(actions) => onSettingsChange({ ...settings, actions })}
            />
          )}
        </>
      )}
    </Overlay>
  );
}
