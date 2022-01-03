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
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import GridIcon from '@material-ui/icons/GridOn';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { generateObjectId } from '@frontend/shared/utils/objectId';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import CRUDMenu from '../common/CRUDMenu';
import AddField from './AddField';
import EditField from './EditField';
import EditFieldGrid from './EditFieldGrid';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const initialValues = {
  showMenu: null,
  field: null,
  showForm: false,
  editGrid: false,
};

type IProps = {
  fields: any[];
  setFields: (newFields: any[]) => void;
  title?: string;
  isSection?: boolean;
};

export default function FormFields({
  fields = [],
  setFields,
  title = 'Fields',
  isSection = false,
}: IProps): any {
  const [values, setValues] = useState(initialValues);

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const newFields = reorder(fields, result.source.index, result.destination.index);
    setFields(newFields);
  }

  const onSave = (field, action) => {
    if (action === 'create') {
      setFields([...fields, field]);
    } else {
      setFields(
        fields.map((oldField) => {
          if (oldField._id === field._id) {
            return {
              ...oldField,
              ...field,
              options: { ...oldField.options, ...field.options },
            };
          }
          return oldField;
        }),
      );
    }
    setValues(initialValues);
  };

  const handleDuplicateField = () => {
    const newField = { ...values.field, _id: generateObjectId() };
    setFields([...fields, newField]);
    setValues(initialValues);
  };

  return (
    <Paper variant="outlined">
      {values.editGrid ? (
        <EditFieldGrid
          field={fields.filter((f) => f._id === values.field._id)[0]}
          onFieldChange={(updatedField) => {
            setFields(
              fields?.map((field) => (field._id === updatedField._id ? updatedField : field)),
            );
          }}
          onClose={() => setValues(initialValues)}
        />
      ) : values.showForm && values.field ? (
        <EditField
          field={fields.filter((f) => f._id === values.field._id)[0]}
          onFieldChange={(updatedField) => {
            setFields(
              fields?.map((field) => (field._id === updatedField._id ? updatedField : field)),
            );
          }}
          onClose={() => setValues(initialValues)}
          isSection
        />
      ) : (
        <>
          <Typography variant="h5" className="d-flex align-items-center pl-2">
            {title}
            <Tooltip title="Add New Field">
              <IconButton
                color="primary"
                onClick={() => setValues({ ...initialValues, showForm: true })}
              >
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
          </Typography>
          <Divider />
          {values.showForm && (
            <AddField
              field={values.field}
              onSave={onSave}
              onCancel={() => setValues(initialValues)}
              isSection={isSection}
            />
          )}
          <List dense>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="list">
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {fields?.map((field: any, index: number) => (
                      <Draggable key={field._id} draggableId={field._id} index={index}>
                        {(draggableProvided, draggableSnapshot) => (
                          <ListItem
                            button
                            // onClick={() => setValues({ ...initialValues, field, showForm: true })}
                            selected={
                              draggableSnapshot.isDragging || field?._id === values?.field?._id
                            }
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                          >
                            <ListItemText primary={field.label} secondary={field.fieldType} />
                            {!snapshot.isDraggingOver && (
                              <ListItemSecondaryAction>
                                <IconButton
                                  edge="end"
                                  onClick={(event) =>
                                    setValues({
                                      ...initialValues,
                                      showMenu: event.currentTarget,
                                      field,
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
            onClose={() => setValues(initialValues)}
            onDelete={() => {
              const anwser = confirm('Are you sure you want delete this field?');
              if (anwser) {
                setValues({ ...values, showMenu: null });
                setFields(fields.filter((field) => field._id !== values.field._id));
              }
            }}
            onEdit={() => {
              setValues({ ...values, showMenu: null, showForm: true });
            }}
          >
            <MenuItem onClick={handleDuplicateField}>
              <ListItemIcon className="mr-n4">
                <FileCopyIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Duplicate" />
            </MenuItem>
            <MenuItem onClick={() => setValues({ ...values, editGrid: true })}>
              <ListItemIcon className="mr-n4">
                <GridIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Grid" />
            </MenuItem>
          </CRUDMenu>
        </>
      )}
    </Paper>
  );
}
