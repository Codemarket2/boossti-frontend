import AddCircle from '@material-ui/icons/AddCircle';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useGetFieldsByType, useDeleteField } from '@frontend/shared/hooks/field';
import FieldForm from './FieldForm';
import CRUDMenu from '../common/CRUDMenu';
import { useState } from 'react';
import FieldsSkeleton from './FieldsSkeleton';
import ErrorLoading from '../common/ErrorLoading';
import Backdrop from '../common/Backdrop';
import { onAlert } from '../../utils/alert';

interface IProps {
  parentId: any;
}

const initialState = {
  showForm: false,
  showMenu: null,
  selectedField: null,
  edit: false,
};

export default function Fields({ parentId }: IProps) {
  const [state, setState] = useState(initialState);

  const deleteCallback = () => {
    setState({ ...state, showMenu: null, selectedField: null, edit: false });
  };
  const { data, loading, error } = useGetFieldsByType({ parentId });

  const { handleDelete, deleteLoading } = useDeleteField({ onAlert, parentId });

  if (!error && (!data || !data.getFieldsByType)) {
    return <FieldsSkeleton />;
  } else if (error) {
    return <ErrorLoading error={error} />;
  }

  return (
    <>
      <Paper variant="outlined" className="p-2 mb-2">
        <Typography variant="h5" className="d-flex align-items-center">
          Fields
          {!state.showForm && (
            <Tooltip title="Add New Field">
              <IconButton
                color="primary"
                onClick={() => setState({ ...initialState, showForm: true })}>
                <AddCircle />
              </IconButton>
            </Tooltip>
          )}
        </Typography>
        {state.showForm && (
          <FieldForm parentId={parentId} onCancel={() => setState(initialState)} />
        )}
        <List component="div">
          {data.getFieldsByType.data.map((field) =>
            state.selectedField && state.selectedField._id === field._id && state.edit ? (
              <FieldForm
                key={field._id}
                field={state.selectedField}
                parentId={parentId}
                onCancel={() => setState(initialState)}
              />
            ) : (
              <ListItem key={field._id} button>
                <ListItemText primary={field.label} secondary={field.fieldType} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={(event) =>
                      setState({ ...state, showMenu: event.currentTarget, selectedField: field })
                    }>
                    <MoreHoriz />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ),
          )}
        </List>
        <CRUDMenu
          show={state.showMenu}
          onClose={() => setState(initialState)}
          onDelete={() => handleDelete(state.selectedField._id, deleteCallback)}
          onEdit={() => setState({ ...state, edit: true, showMenu: null })}
        />
      </Paper>
      <Backdrop open={deleteLoading} />
    </>
  );
}
