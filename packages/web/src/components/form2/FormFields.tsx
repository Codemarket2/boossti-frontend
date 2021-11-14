/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import CRUDMenu from '../common/CRUDMenu';
import AddField from './AddField';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const initialState = {
  showMenu: null,
  field: null,
  fieldIndex: null,
  showForm: false,
  // edit: false,
};

export default function FormFields({ state, setState }: any): any {
  const [values, setValues] = useState(initialState);

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const fields = reorder(state.fields, result.source.index, result.destination.index);
    setState({ ...state, fields });
  }

  const onSave = (field, action) => {
    if (action === 'create') {
      setState({ ...state, fields: [...state.fields, field] });
    } else {
      setState({
        ...state,
        fields: state.fields.map((oldField) => {
          if (oldField._id === field._id) {
            return { ...oldField, ...field, options: { ...oldField.options, ...field.options } };
          }
          return oldField;
        }),
      });
    }
    setValues(initialState);
  };

  return (
    <Paper variant="outlined">
      <Typography variant="h5" className="d-flex align-items-center pl-2">
        Fields
        {!state.showForm && (
          <Tooltip title="Add New Field">
            <IconButton
              color="primary"
              onClick={() => setValues({ ...initialState, showForm: true })}
            >
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        )}
      </Typography>
      <Divider />
      {values.showForm && (
        <AddField field={values.field} onSave={onSave} onCancel={() => setValues(initialState)} />
      )}
      <List>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {state?.fields.map((field: any, index: number) => (
                  <Draggable key={field._id} draggableId={field._id} index={index}>
                    {(draggabelProvided, draggabelSnapshot) => (
                      <ListItem
                        selected={draggabelSnapshot.isDragging}
                        ref={draggabelProvided.innerRef}
                        {...draggabelProvided.draggableProps}
                        {...draggabelProvided.dragHandleProps}
                      >
                        <ListItemText primary={field.label} secondary={field.fieldType} />
                        {!snapshot.isDraggingOver && (
                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              onClick={(event) =>
                                setValues({
                                  ...initialState,
                                  showMenu: event.currentTarget,
                                  field,
                                  fieldIndex: index,
                                })
                              }
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        )}
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </List>
      <CRUDMenu
        show={values.showMenu}
        onClose={() => setValues(initialState)}
        onDelete={() => {
          const anwser = confirm('Are you sure you want delete this field?');
          if (anwser) {
            setValues({ ...values, showMenu: null });
            setState({
              ...state,
              fields: state.fields.filter((field, index) => index !== values.fieldIndex),
            });
          }
        }}
        onEdit={() => setValues({ ...values, showForm: true, showMenu: null })}
      />
    </Paper>
  );
}
