// REACT
import { useEffect, useState } from 'react';

// MUI
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';

// SHARED
import { IForm } from '@frontend/shared/types';

// WEB
import { DisplayForm, DisplayFormSettings } from '../form2/DisplayForm';
import PreviewFormSetting from '../form2/FormSetting';
import FormFields from '../form2/FormFields';

// EMBED SPECIFIC LIBS
import { CopytoClipboard, getEmbedLink } from './embedLibs';

interface EditEmbeddedSettingsProps {
  form: IForm;
  oldSettings?: DisplayFormSettings;
  onChange?: (newSettings: DisplayFormSettings) => void;
}

export const EmbedFormTab = ({ form, onChange, oldSettings }: EditEmbeddedSettingsProps) => {
  const [formSettings, setFormSettings] = useState<DisplayFormSettings>(oldSettings || {});

  const [viewTab, setViewTab] = useState<boolean>(false);
  const [viewSettings, setViewSettings] = useState<boolean>(false);
  const [viewField, setViewField] = useState<boolean>(false);

  const [tabSettings, setTabSettings] = useState({
    iframeTag: getEmbedLink({
      FormSettings: formSettings,
      formSlug: form.slug,
      filterSettings: false,
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
        filterSettings: false,
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
            <Button variant="contained" onClick={() => setViewTab(!viewTab)}>
              Customize
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

          {viewTab && (
            <TabContext value="1">
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs>
                  <Tab
                    onClick={() => {
                      setTabSettings((prev) => ({
                        ...prev,
                        showFormSettings: !prev.showFormSettings,
                      }));
                      if (viewField) {
                        setViewField(false);
                      }
                      setViewSettings(!viewSettings); // Onclick Event to decide which setting to show when tabs are clicked
                    }}
                    label="Settings"
                  />

                  <Tab
                    onClick={() => {
                      if (viewSettings) {
                        setViewSettings(false);
                      }
                      setViewField(!viewField); // Onclick Event to decide which setting to show when tabs are clicked
                    }}
                    label="Fields"
                  />
                </Tabs>
              </Box>
            </TabContext>
          )}

          {viewTab && (
            <>
              {viewSettings && (
                <PreviewFormSetting
                  formId={form?._id}
                  settings={formSettings}
                  state={form}
                  onChange={(newSettings) => setFormSettings({ ...formSettings, ...newSettings })}
                />
              )}
              {viewField && (
                <FormFields
                  title="Fields"
                  fields={form.fields}
                  setFields={(newFields) => ({ fields: newFields })}
                  parentFields={form.fields?.map((f) => ({
                    ...f,
                    formId: form._id,
                    label: f?.label,
                    formName: form?.name,
                  }))}
                  formId={form?._id}
                  isWorkflow
                  showSystemFields
                />
              )}
            </>
          )}
        </Paper>

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
