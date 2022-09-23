// REACT
import { useEffect, useState } from 'react';

// MUI
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';

// import List from '@mui/material/List'
// import ListItem from '@mui/material/ListItem';

// WEB
import Overlay from '../common/Overlay';
import { DisplayForm, DisplayFormSettings } from '../form2/DisplayForm';

type TSettingsPropOptions = {
  title: string;
  value: any;
};

interface SelectMenuProps {
  value: TSettingsPropOptions['value'];
  options: Array<TSettingsPropOptions>;
  onChange: (selectedValue: this['value']) => void;
  title: string;
}

const SettingWidgetTypeOptions: TSettingsPropOptions[] = [
  {
    title: 'Both',
    value: 'both',
  },
  {
    title: 'Form',
    value: 'form',
  },
  {
    title: 'Response',
    value: 'response',
  },
];

const SettingFormViewOptions: TSettingsPropOptions[] = [
  {
    title: 'Full Form',
    value: 'fullForm',
  },
  {
    title: 'oneField',
    value: 'oneField',
  },
  {
    title: 'Leaderboard',
    value: 'leaderboard',
  },
  {
    title: 'Button',
    value: 'button',
  },
  {
    title: 'Select Item',
    value: 'selectItem',
  },
];

const SettingWhoCanSubmitOptions: TSettingsPropOptions[] = [
  {
    title: 'All',
    value: 'all',
  },
  {
    title: 'Authenticated User',
    value: 'authUser',
  },
];

const SettingResponseViewOptions: TSettingsPropOptions[] = [
  {
    title: 'Button',
    value: 'button',
  },
  {
    title: 'Table',
    value: 'table',
  },
  {
    title: 'Table 2',
    value: 'table2',
  },
  {
    title: 'Vertical',
    value: 'vertical',
  },
];

const SettingWhoCanViewResponsesOptions: TSettingsPropOptions[] = [
  {
    title: 'All',
    value: 'all',
  },
  {
    title: 'Authenticated User',
    value: 'authUser',
  },
];

const SettingonlyMyResponsesOptions: TSettingsPropOptions[] = [
  {
    title: 'True',
    value: true,
  },
  {
    title: 'False',
    value: false,
  },
];

const SelectMenu = ({ value, options, onChange, title }: SelectMenuProps) => {
  return (
    <FormControl fullWidth size="small">
      <InputLabel id={`form-settings-${title}`}>{title}</InputLabel>
      <Select
        labelId={`form-settings-${title}`}
        value={value || ''}
        label={title}
        onChange={(evt) => onChange(evt.target.value)}
      >
        {options.map((option, idx) => (
          <MenuItem key={idx} value={option.value}>
            {option.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

interface FormPreviewOverlayProps {
  showOverlay: boolean;
  onClose: () => void;
  formSlug: string;
  onSave: (settings: DisplayFormSettings) => void;
  onChange?: (settings: DisplayFormSettings) => void;
  oldSettings?: DisplayFormSettings;
}

const FormPreviewOverlay = ({
  showOverlay,
  onClose,
  onSave,
  formSlug,
  onChange,
  oldSettings,
}: FormPreviewOverlayProps) => {
  const [settings, setSettings] = useState<DisplayFormSettings>(oldSettings || {});

  useEffect(() => {
    if (onChange) onChange(settings);
  }, [settings]);

  // (evt) =>
  //   setSettings((prev) => ({
  //     ...prev,
  //     widgetType: evt.target.value as DisplayFormSettings['widgetType'],
  //   }));

  return (
    <Overlay open={showOverlay} onClose={onClose} title="Edit Embedded Form Settings">
      <Container>
        <Stack direction="column" spacing={1}>
          <Box>
            <Stack direction="column" spacing={1}>
              <Typography variant="h5">Settings</Typography>

              <SelectMenu
                title="Widget Type"
                options={SettingWidgetTypeOptions}
                value={settings.widgetType}
                onChange={(newVal) => setSettings({ ...settings, widgetType: newVal })}
              />

              <SelectMenu
                title="Form View"
                options={SettingFormViewOptions}
                value={settings.formView}
                onChange={(newVal) => setSettings({ ...settings, formView: newVal })}
              />

              <SelectMenu
                title="Who can submit"
                options={SettingWhoCanSubmitOptions}
                value={settings.whoCanSubmit}
                onChange={(newVal) => setSettings({ ...settings, whoCanSubmit: newVal })}
              />

              <SelectMenu
                title="Response View"
                options={SettingResponseViewOptions}
                value={settings.responsesView}
                onChange={(newVal) => setSettings({ ...settings, responsesView: newVal })}
              />

              <SelectMenu
                title="Who can view responses ?"
                options={SettingWhoCanViewResponsesOptions}
                value={settings.whoCanViewResponses}
                onChange={(newVal) => setSettings({ ...settings, whoCanViewResponses: newVal })}
              />

              <SelectMenu
                title="Only my responses"
                options={SettingonlyMyResponsesOptions}
                value={settings.onlyMyResponses}
                onChange={(newVal) => setSettings({ ...settings, onlyMyResponses: newVal })}
              />

              <TextField
                label="Button Label"
                value={settings.buttonLabel || ''}
                size="small"
                onChange={(evt) => setSettings({ ...settings, buttonLabel: evt.target.value })}
              />

              <Button variant="contained" fullWidth onClick={() => onSave(settings)}>
                Save
              </Button>
            </Stack>
          </Box>
          <Box>
            <Typography variant="h5">Embedded Form Preview</Typography>
            <DisplayForm slug={formSlug} settings={settings} />
          </Box>
        </Stack>
      </Container>
    </Overlay>
  );
};

interface EditEmbeddedSettingsProps {
  formSlug: string;
  onSave: (newSettings: DisplayFormSettings) => void;
  oldSettings?: DisplayFormSettings;
}

export const EditEmbeddedSettings = ({
  formSlug,
  onSave,
  oldSettings,
}: EditEmbeddedSettingsProps) => {
  const [showPreviewOverlay, setPreviewOverlay] = useState(false);

  return (
    <>
      <FormPreviewOverlay
        showOverlay={showPreviewOverlay}
        onClose={() => setPreviewOverlay(false)}
        formSlug={formSlug}
        onSave={onSave}
        oldSettings={oldSettings}
      />
      <Button variant="contained" fullWidth onClick={() => setPreviewOverlay(true)}>
        Show Embedded Form Settings
      </Button>
    </>
  );
};

export default EditEmbeddedSettings;
