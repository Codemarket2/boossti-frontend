import AddCircle from '@material-ui/icons/AddCircle';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
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

export default function Fields({ parentId }: IProps) {
  const [state, setState] = useState({ showForm: false, showMenu: null, selectedField: null });

  const deleteCallback = () => {
    setState({ ...state, showMenu: null, selectedField: null });
  };
  const { data, loading, error } = useGetFieldsByType({ parentId });

  const { handleDelete, deleteLoading } = useDeleteField({ onAlert, parentId });

  if (loading || (!error && (!data || !data.getFieldsByType))) {
    return <FieldsSkeleton />;
  } else if (error) {
    return <ErrorLoading error={error} />;
  }

  return (
    <>
      <Paper variant="outlined" className="p-2 mb-2">
        <Typography variant="h5">Fields</Typography>
        {state.showForm ? (
          <FieldForm parentId={parentId} onCancel={() => setState({ ...state, showForm: false })} />
        ) : (
          <Button
            className="mt-2"
            size="small"
            variant="outlined"
            component="span"
            color="primary"
            startIcon={<AddCircle />}
            onClick={() => setState({ ...state, showForm: true })}>
            Add new field
          </Button>
        )}
        <List component="div">
          {data.getFieldsByType.data.map((field) => (
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
          ))}
        </List>
        <CRUDMenu
          show={state.showMenu}
          onClose={() => setState({ ...state, showMenu: null, selectedField: null })}
          onDelete={() => handleDelete(state.selectedField._id, deleteCallback)}
        />
      </Paper>
      <Backdrop open={deleteLoading} />
    </>
  );
}
