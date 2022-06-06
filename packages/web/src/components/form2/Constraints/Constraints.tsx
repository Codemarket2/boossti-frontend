import AddCircle from '@mui/icons-material/AddCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import React, { useState } from 'react';
import ConstraintForm from './ConstraintForm';
import CRUDMenu from '../../common/CRUDMenu';

interface IProps {
  form: any;
  onConstraintChange: (arg: any) => void;
}

const initialState = { showForm: false, constraint: null, constraintIndex: null, showMenu: null };

export default function Constraints({ form, onConstraintChange }: IProps) {
  const [state, setState] = useState(initialState);
  const constraints = form?.settings?.constraints || [];

  const onSave = (newConstraints, action: 'create' | 'update') => {
    if (action === 'update') {
      onConstraintChange(
        constraints?.map((constraint, index) =>
          index === state.constraintIndex ? newConstraints : constraint,
        ),
      );
    } else {
      onConstraintChange([...constraints, newConstraints]);
    }
    setState(initialState);
  };

  const onDelete = () => {
    onConstraintChange(constraints?.filter((c, index) => index !== state.constraintIndex));
    setState(initialState);
  };

  return (
    <>
      {state?.showForm ? (
        <ConstraintForm
          constraint={state.constraint}
          fields={form?.fields}
          onSave={onSave}
          onCancel={() => setState(initialState)}
        />
      ) : (
        <Paper variant="outlined">
          <Typography variant="h5" className="d-flex align-items-center p-2">
            Constraints
            <Tooltip title="Add Constraint">
              <IconButton color="primary" onClick={() => setState({ ...state, showForm: true })}>
                <AddCircle />
              </IconButton>
            </Tooltip>
          </Typography>
          <List>
            {constraints?.map((constraint, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemText primary={constraint?.name} secondary={constraint?.constraintType} />
                </ListItemButton>
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={(event) =>
                      setState({
                        ...initialState,
                        constraint,
                        constraintIndex: index,
                        showMenu: event.currentTarget,
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
              onEdit={() => setState({ ...state, showForm: true, showMenu: null })}
              onDelete={onDelete}
            />
          </List>
        </Paper>
      )}
    </>
  );
}
