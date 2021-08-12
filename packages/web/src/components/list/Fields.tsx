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
import FieldForm from './FieldForm';
import CRUDMenu from '../common/CRUDMenu';
import { useState } from 'react';

export default function Fields() {
  const [state, setState] = useState({ showForm: false, showMenu: null });
  return (
    <Paper variant="outlined" className="p-2 mb-2">
      <Typography variant="h5">Fields</Typography>
      {state.showForm ? (
        <FieldForm onCancel={() => setState({ ...state, showForm: false })} />
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
        <ListItem button>
          <ListItemText primary="Doctors" secondary="Type" />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              onClick={(event) => setState({ ...state, showMenu: event.currentTarget })}>
              <MoreHoriz />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button>
          <ListItemText primary="Buy Link" secondary="String" />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              <MoreHoriz />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <CRUDMenu show={state.showMenu} onClose={() => setState({ ...state, showMenu: null })} />
    </Paper>
  );
}
