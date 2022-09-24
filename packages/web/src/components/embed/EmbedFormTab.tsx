// REACT
import { useEffect, useState } from 'react';

// MUI
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

// SHARED
import { IForm } from '@frontend/shared/types';

// WEB
import { DisplayForm, DisplayFormSettings } from '../form2/DisplayForm';
import PreviewFormSetting from '../form2/FormSetting';

// EMBED SPECIFIC LIBS
import { CopytoClipboard, getEmbedLink } from './embedLibs';

interface EditEmbeddedSettingsProps {
  form: IForm;
  oldSettings?: DisplayFormSettings;
  onChange?: (newSettings: DisplayFormSettings) => void;
}

export const EmbedFormTab = ({ form, onChange, oldSettings }: EditEmbeddedSettingsProps) => {
  const [formSettings, setFormSettings] = useState<DisplayFormSettings>(oldSettings || {});
  const [tabSettings, setTabSettings] = useState({
    iframeTag: getEmbedLink({
      FormSettings: formSettings,
      formSlug: form.slug,
    }),
    showFormPreview: false,
    showFormSettings: false,
  });

  useEffect(() => {
    if (onChange) onChange(formSettings);

    // UPDATE IFRAME TAG STRING
    setTabSettings({
      ...tabSettings,
      iframeTag: getEmbedLink({
        FormSettings: formSettings,
        formSlug: form.slug,
      }),
    });
  }, [formSettings]);

  return (
    <>
      <Stack direction="column" spacing={1}>
        <Paper variant="outlined" className="p-2">
          <div>
            <div className="ck-content">
              <pre>
                <code
                  style={{
                    wordWrap: 'normal',
                  }}
                >
                  {tabSettings.iframeTag}
                </code>
              </pre>
            </div>
          </div>

          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              onClick={() =>
                CopytoClipboard(
                  getEmbedLink({
                    FormSettings: formSettings,
                    formSlug: form.slug,
                  }),
                )
              }
            >
              Copy
            </Button>
            <Button
              variant="contained"
              onClick={() =>
                setTabSettings((prev) => ({ ...prev, showFormSettings: !prev.showFormSettings }))
              }
            >
              {tabSettings.showFormSettings ? 'Hide' : 'Show'} Form Settings
            </Button>

            <Button
              variant="contained"
              onClick={() =>
                setTabSettings((prev) => ({ ...prev, showFormPreview: !prev.showFormPreview }))
              }
            >
              {tabSettings.showFormPreview ? 'Hide' : 'Show'} Form Preview
            </Button>
          </Stack>
        </Paper>

        {tabSettings.showFormSettings && (
          <Paper variant="outlined" className="p-2">
            <PreviewFormSetting
              formId={form?._id}
              settings={formSettings}
              state={form}
              onChange={(newSettings) => setFormSettings({ ...formSettings, ...newSettings })}
            />
          </Paper>
        )}

        {tabSettings.showFormPreview && (
          <Paper variant="outlined" className="p-2">
            <Box>
              <Typography variant="h5">Embedded Form Preview</Typography>
              <DisplayForm _id={form?._id} settings={formSettings} />
            </Box>
          </Paper>
        )}
      </Stack>
    </>
  );
};

export default EmbedFormTab;
