import { useGetForm } from '@frontend/shared/hooks/form';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { useState } from 'react';
import ActionForm from './ActionForm';
import CRUDMenu from '../common/CRUDMenu';
import ErrorLoading from '../common/ErrorLoading';

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
    <Paper variant="outlined">
      <Typography variant="h5" className="d-flex align-items-center pl-2">
        Actions
        {!state.showForm && (
          <Tooltip title="Add New Action">
            <IconButton color="primary" onClick={() => setState({ ...state, showForm: true })}>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        )}
      </Typography>
      {state.showForm ? (
        <ActionForm
          emailFields={fields?.filter(
            (field) => field.fieldType === 'email' && field.options.required,
          )}
          fields={fields}
          onCancel={() => setState(initialState)}
          onSave={onSave}
          action={state.selectedItem}
        />
      ) : (
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
  );
}

export function ActionsWrapper({
  formId,
  settings,
  onChange,
}: {
  formId: string;
  settings?: any;
  onChange: (action: any) => void;
}) {
  const { data, error } = useGetForm(formId);

  if (!data || error) {
    return <ErrorLoading error={error} />;
  }
  return (
    <Actions
      fields={data?.getForm?.fields}
      settings={settings || data?.getForm?.settings}
      onChange={onChange}
    />
  );
}
