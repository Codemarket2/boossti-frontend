import { useUpdateSection } from '@frontend/shared/hooks/section';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Paper,
  List,
  ListItem,
  Typography,
  InputLabel,
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
  ListItemSecondaryAction,
  Divider,
} from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { onAlert } from '../../utils/alert';
import { convertToSlug } from './FormFields';

interface IProps {
  settings: any;
  formId: any;
  isSection?: boolean;
  fields?: any;
}

const initialState = { showForm: false, selectedIndex: null, selectedItem: null, showMenu: null };

export default function DisplaySettings({ formId, settings, fields, isSection }: IProps): any {
  const [state, setState] = useState(initialState);
  const { onSectionChange, section, handleUpdateSection, error } = useUpdateSection({
    onAlert,
    _id: settings?.customSectionId,
  });
  const router = useRouter();
  const handleNavigate = (fieldLabel) => {
    if (isSection) {
      const url = `${window.location.origin}${window.location.pathname}#${convertToSlug(
        fieldLabel,
      )}`;
      router.push(url);
    }
  };
  const widgetTypes = {
    both: 'Display form & responses',
    form: 'Display only form',
    responses: 'Display only responses',
  };
  const formViewTypes = {
    fullForm: 'Full Form',
    oneField: 'One field at a time',
    leaderboard: 'Leaderboad',
    button: 'Button',
    selectItem: 'Select Item',
  };

  const whoCanSubmitTypes = {
    all: 'All users',
    authUser: 'Authenticated users',
    onlyPageOwner: 'Only page owner',
  };
  const responseViewTypes = {
    button: 'Button',
    table: 'Table',
    vertical: 'Vertical',
  };
  const whoCanSeeResponsesTypes = {
    all: 'Both authenticated & unauthenticated users',
    authUser: 'Only Authenticated users',
    onlyPageOwner: 'Only page owner',
  };

  return (
    <Paper>
      <>
        <SPaper label="Widget Type">{widgetTypes[settings?.widgetType] || widgetTypes.both}</SPaper>
        {settings?.widgetType !== 'responses' && (
          <>
            <SPaper label="Form view">
              {formViewTypes[settings?.formView] || formViewTypes.fullForm}
            </SPaper>
            {/* ADD THE SELECT FORM FIELD  */}
            {settings?.formView === 'leaderboard' && (settings.minValue || settings.maxValue) && (
              <>
                <h3>Leader Board</h3>
                <div>
                  {settings?.minValue && <SPaper label="min value">{settings?.minValue}</SPaper>}
                  {settings?.maxValue && <SPaper label="max value">{settings?.maxValue}</SPaper>}
                </div>
              </>
            )}
            {settings?.formView === 'button' && (
              <>
                <SPaper label="Button label">{settings.buttonLabel || 'Not Set'}</SPaper>
              </>
            )}
            {settings?.formView === 'selectItem' && (
              <>
                <SPaper label="Select Item Field">{settings?.selectItemField || 'Not Set'}</SPaper>
              </>
            )}
            <>
              <SPaper label="Who can submit the form">
                {whoCanSubmitTypes[settings?.whoCanSubmit] || whoCanSubmitTypes.all}
              </SPaper>
            </>
            {!(settings?.whoCanSubmit === 'all') && (
              <>
                {settings?.viewAuthRequired && (
                  <SPaper>Authentication required to view form</SPaper>
                )}
              </>
            )}
            {settings?.multipleResponses && <SPaper>Multiple Responses Allowed</SPaper>}
            {settings?.editResponse && <SPaper>Allow Editing of Response</SPaper>}
          </>
        )}
        {settings?.widgetType !== 'form' && (
          <>
            <SPaper label="Response view">
              {responseViewTypes[settings?.responsesView] || responseViewTypes.button}
            </SPaper>
            <SPaper label="Who can view responses">
              {whoCanSeeResponsesTypes[settings?.whoCanViewResponses] ||
                whoCanSeeResponsesTypes.all}
            </SPaper>
            {settings?.onlyMyResponses && <SPaper>Users can view only their own responses</SPaper>}
          </>
        )}
        {settings?.showFormTitle && <SPaper>Show Form Title</SPaper>}
      </>
      <>
        <Paper variant="outlined" style={{ margin: '1rem 0' }}>
          <Typography variant="h5" className="d-flex align-items-center p-2">
            Actions
          </Typography>
          <Divider />
          <List>
            {settings?.actions?.map((action: any, i: any) => (
              <ListItem button key={i}>
                <ListItemText primary={action.name} secondary={action?.actionType} />
                {!action?.active && (
                  <Tooltip title="Action is not active">
                    <ListItemIcon className="text-danger">
                      <ErrorOutlineIcon />
                    </ListItemIcon>
                  </Tooltip>
                )}
              </ListItem>
            ))}
          </List>
        </Paper>
      </>
      <>
        <Paper>
          <Typography variant="h5" className="d-flex align-items-center p-2">
            Response Section
          </Typography>
          <Divider />
          <List>
            {section !== undefined &&
              section.fields?.map((field: any, i: any) => (
                <div>
                  <ListItem button onClick={() => handleNavigate(field.label)}>
                    <ListItemText
                      primary={field.label}
                      secondary={
                        (field?.fieldType === 'form' && field?.form?.name) || field.fieldType
                      }
                    />
                  </ListItem>
                  {field?.fieldType === 'form' && (
                    <DisplaySettings
                      fields={section?.fields}
                      formId={field?.form?._id}
                      isSection={isSection}
                      key={field._id}
                      settings={field?.options?.settings}
                    />
                  )}
                </div>
              ))}
          </List>
        </Paper>
      </>
    </Paper>
  );
}

interface ISpaper {
  children?: React.ReactNode;
  label?: string;
}
export function SPaper({ children, label }: ISpaper) {
  return (
    <Paper
      variant="outlined"
      style={{ margin: '.8rem 0rem', padding: '0.5rem 1rem', position: 'relative' }}
    >
      {label && (
        <InputLabel
          style={{
            top: 0,
            left: 10,
            position: 'absolute',
            background: 'white',
            margin: '0',
            padding: '0px 4px',
            transform: 'translate(0, -0.4rem)',
            width: 'fit-content',
            fontSize: '10px',
          }}
        >
          {label}
        </InputLabel>
      )}
      <Typography>{children}</Typography>
    </Paper>
  );
}
