import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useState } from 'react';
import ActionForm from './ActionForm';
import CRUDMenu from '../common/CRUDMenu';

interface IProps {
  fields: any;
  settings: any;
  onChange: any;
}

const initialState = { showForm: false, selectedIndex: null, selectedItem: null, showMenu: null };

export default function Actions({ fields, settings, onChange }: IProps) {
  const [state, setState] = useState(initialState);

  const onSave = (payload, operation) => {
    let newActions = settings?.actions || [];
    if (operation === 'update') {
      // Update
      newActions = newActions?.map((a, i) => (i === state.selectedIndex ? payload : a));
    } else {
      // Create
      newActions = [...newActions, payload];
    }
    onChange(newActions);
    setState(initialState);
  };

  const onDelete = () => {
    const newActions = settings?.actions?.filter((action, i) => i !== state.selectedIndex);
    onChange(newActions);
    setState(initialState);
  };

  return (
    <>
      {state.showForm ? (
        <ActionForm
          emailFields={fields?.filter(
            (field) => field.fieldType === 'email' && field.options.required,
          )}
          nameFields={fields?.filter(
            (field) => field.fieldType === 'text' && field.options.required,
          )}
          fields={fields}
          onCancel={() => setState(initialState)}
          onSave={onSave}
          action={state.selectedItem}
        />
      ) : (
        <Paper variant="outlined">
          <Typography variant="h5" className="d-flex align-items-center pl-2">
            Actions
            {!state.showForm && (
              <Tooltip title="Add New Action">
                <IconButton
                  color="primary"
                  onClick={() => setState({ ...state, showForm: true })}
                  size="large"
                >
                  <AddCircleIcon />
                </IconButton>
              </Tooltip>
            )}
          </Typography>
          {!state.showForm && (
            <List>
              {settings?.actions?.map((action, i) => (
                <ListItem button key={i}>
                  <ListItemText primary={action.name} secondary={action?.actionType} />
                  {!action?.active && (
                    <Tooltip title="Action is not active">
                      <ListItemIcon className="text-danger">
                        <ErrorOutlineIcon />
                      </ListItemIcon>
                    </Tooltip>
                  )}
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={(event) =>
                        setState({
                          ...initialState,
                          showMenu: event.currentTarget,
                          selectedIndex: i,
                          selectedItem: action,
                        })
                      }
                      size="large"
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
              <CRUDMenu
                show={state.showMenu}
                onClose={() => setState(initialState)}
                onDelete={onDelete}
                onEdit={() =>
                  setState({
                    ...state,
                    showMenu: null,
                    showForm: true,
                  })
                }
              />
            </List>
          )}
        </Paper>
      )}
    </>
  );
}

export function ActionsWrapper({
  settings,
  onChange,
  pageFields = [],
}: {
  settings?: any;
  onChange: (action: any) => void;
  pageFields: any;
}) {
  return <Actions fields={pageFields} settings={settings} onChange={onChange} />;
}
