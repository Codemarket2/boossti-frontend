import React, { useState, memo } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

const initialFields = [
  { _id: '1', label: 'Email', fieldType: 'string' },
  { _id: '2', label: 'Password', fieldType: 'string' },
  { _id: '3', label: 'Message', fieldType: 'string' },
  { _id: '4', label: 'Name', fieldType: 'string' },
  { _id: '5', label: 'Last Name', fieldType: 'string' },
  { _id: '6', label: 'Address', fieldType: 'string' },
];

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

function Quote({ field, index }) {
  return (
    <Draggable draggableId={field._id} index={index}>
      {(provided) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <ListItemIcon>
            <DragIndicatorIcon />
          </ListItemIcon>
          <ListItemText primary={field.label} secondary={field.fieldType} />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              <MoreHoriz />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )}
    </Draggable>
  );
}

const QuoteList = memo(function QuoteList({ fields }: any) {
  return (
    <List>
      {fields.map((field: any, index: number) => (
        <Quote field={field} index={index} key={field._id} />
      ))}
    </List>
  );
});

function QuoteApp() {
  const [fields, setFields] = useState([...initialFields]);

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const tempField: any = reorder(fields, result.source.index, result.destination.index);

    setFields(tempField);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <QuoteList fields={fields} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default QuoteApp;
