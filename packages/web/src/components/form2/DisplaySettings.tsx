import { useUpdateSection } from '@frontend/shared/hooks/section';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { MenuItem, TextField } from '@material-ui/core';

import { onAlert } from '../../utils/alert';
import InputGroup from '../common/InputGroup';
import SelectFormFields from './SelectFormFields';
import ResponseSections from '../response/ResponseSection';
import Actions from './Actions';

interface IProps {
  settings: any;
  onChange: (val: any) => void;
  formId: any;
  isSection?: boolean;
  fields?: any;
}

export default function DisplaySettings({
  formId,
  settings,
  onChange,
  fields,
  isSection,
}: IProps): any {
  const { onSectionChange, section, handleUpdateSection, error } = useUpdateSection({
    onAlert,
    _id: formId,
  });

  // if (settings === undefined) {
  //   return null;
  // }

  return (
    <Paper variant="outlined" className="p-2">
      <>
        <InputGroup>
          <TextField
            select
            fullWidth
            size="small"
            variant="outlined"
            label="Widget type"
            value={settings?.widgetType ?? 'both'}
            onChange={({ target }) => onChange({ widgetType: target.value })}
          >
            <MenuItem value="both">{`Display form & responses`}</MenuItem>
            <MenuItem value="form">Display only form</MenuItem>
            <MenuItem value="responses">Display only responses</MenuItem>
          </TextField>
        </InputGroup>
        {settings?.widgetType !== 'responses' && (
          <>
            <InputGroup>
              <TextField
                select
                fullWidth
                size="small"
                variant="outlined"
                label="Form view"
                value={settings?.formView ?? 'fullForm'}
                onChange={({ target }) => onChange({ formView: target.value })}
              >
                <MenuItem value="fullForm">Full Form</MenuItem>
                <MenuItem value="oneField">One field at a time</MenuItem>
                <MenuItem value="leaderboard">Leaderboad</MenuItem>
                <MenuItem value="button">Button</MenuItem>
                <MenuItem value="selectItem">Select Item</MenuItem>
              </TextField>
            </InputGroup>
            {/* ADD THE SELECT FORM FIELD  */}
            {settings?.formView === 'leaderboard' && (
              <InputGroup>
                <h3>Leader Board</h3>
                <div>
                  <TextField
                    className="mr-3"
                    value={settings?.minValue}
                    onChange={(e) => onChange({ minValue: e.target.value })}
                    label="min value"
                    variant="outlined"
                    size="small"
                    type="number"
                    error={!settings?.minValue}
                    helperText={!settings?.minValue && 'Required'}
                  />
                  <TextField
                    value={settings?.maxValue}
                    onChange={(e) => onChange({ maxValue: e.target.value })}
                    placeholder="max value"
                    variant="outlined"
                    size="small"
                    type="number"
                    error={!settings?.maxValue}
                    helperText={!settings?.maxValue && 'Required'}
                  />
                </div>
              </InputGroup>
            )}
            {settings?.formView === 'button' && (
              <InputGroup>
                <TextField
                  fullWidth
                  value={settings?.buttonLabel}
                  onChange={(e) => onChange({ buttonLabel: e.target.value })}
                  label="Button label"
                  variant="outlined"
                  size="small"
                  error={!settings?.buttonLabel}
                  helperText={!settings?.buttonLabel && 'Required'}
                />
              </InputGroup>
            )}
            {settings?.formView === 'selectItem' && (
              <InputGroup>
                <SelectFormFields
                  formId={formId}
                  value={settings?.selectItemField}
                  onChange={async (newValue, label) => {
                    onChange({ selectItemField: newValue });
                  }}
                  error={!settings?.selectItemField}
                  helperText={!settings?.selectItemField && 'required'}
                />
              </InputGroup>
            )}
            <InputGroup>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                select
                value={settings?.whoCanSubmit ?? 'authUser'}
                label="Who can submit the form"
                onChange={({ target }) => onChange({ whoCanSubmit: target.value })}
              >
                <MenuItem value="all">{'Both authenticated & unauthenticated users'}</MenuItem>
                <MenuItem value="authUser">Only Authenticated users</MenuItem>
                {isSection && <MenuItem value="onlyPageOwner">Only page owner</MenuItem>}
              </TextField>
            </InputGroup>
            {!(settings?.whoCanSubmit === 'all') && (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={settings?.viewAuthRequired}
                      onChange={({ target }) => onChange({ viewAuthRequired: target.checked })}
                      name="authRequired"
                      color="primary"
                    />
                  }
                  label="Authentication required to view form"
                />
                <br />
              </>
            )}
            <FormControlLabel
              control={
                <Checkbox
                  checked={settings?.multipleResponses ?? false}
                  onChange={({ target }) => onChange({ multipleResponses: target.checked })}
                  name="multipleValues"
                  color="primary"
                />
              }
              label="can submit multiple responses"
            />
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  checked={settings?.editResponse ?? false}
                  onChange={({ target }) => onChange({ editResponse: target.checked })}
                  name="multipleValues"
                  color="primary"
                />
              }
              label="can edit their response"
            />
          </>
        )}
        {settings?.widgetType !== 'form' && (
          <>
            <InputGroup>
              <TextField
                select
                fullWidth
                size="small"
                variant="outlined"
                label="Responses view"
                value={settings?.responsesView ?? 'table'}
                onChange={({ target }) => onChange({ responsesView: target.value })}
              >
                <MenuItem value="button">Button</MenuItem>
                <MenuItem value="table">Table</MenuItem>
                <MenuItem value="vertical">Vertical</MenuItem>
              </TextField>
            </InputGroup>
            <InputGroup>
              <TextField
                select
                fullWidth
                size="small"
                variant="outlined"
                label="Who can view responses"
                value={settings?.whoCanViewResponses ?? 'authUser'}
                onChange={({ target }) => onChange({ whoCanViewResponses: target.value })}
              >
                <MenuItem value="all">{'Both authenticated & unauthenticated users'}</MenuItem>
                <MenuItem value="authUser">Only Authenticated users</MenuItem>
                {isSection && <MenuItem value="onlyPageOwner">Only page owner</MenuItem>}
              </TextField>
            </InputGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={settings?.onlyMyResponses ?? false}
                  onChange={({ target }) => onChange({ onlyMyResponses: target.checked })}
                  name="showFormResponses"
                  color="primary"
                />
              }
              label="Users can view only their own responses"
            />
          </>
        )}
        <br />
        <FormControlLabel
          control={
            <Checkbox
              checked={settings?.showFormTitle ?? false}
              onChange={({ target }) => onChange({ showFormTitle: target.checked })}
              name="showFormTitle"
              color="primary"
            />
          }
          label="Show form title"
        />
      </>
      <Actions fields={fields} settings={settings} onChange={(actions) => onChange({ actions })} />
      {/* <WorkFlow _id={formId} /> */}
      <ResponseSections
        title="Response Section"
        section={section}
        authorized
        onSectionChange={onSectionChange}
      />
    </Paper>
  );
}