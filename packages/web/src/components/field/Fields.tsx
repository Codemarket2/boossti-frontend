import AddCircle from '@material-ui/icons/AddCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import {
  useGetFieldsByType,
  useDeleteField,
  useUpdateFieldPosition,
} from '@frontend/shared/hooks/field';
import { useState, memo, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import FieldForm from './FieldForm';
import CRUDMenu from '../common/CRUDMenu';
import FieldsSkeleton from './FieldsSkeleton';
import ErrorLoading from '../common/ErrorLoading';
import Backdrop from '../common/Backdrop';
import { onAlert } from '../../utils/alert';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const QuoteList = memo(function QuoteList({ fields, onClick, hideMore }: any) {
  return fields?.map((field: any, index: number) => (
    <Draggable draggableId={field._id} index={index} key={field._id}>
      {(provided, draggableSnapshot) => (
        <ListItem
          button
          selected={draggableSnapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ListItemText primary={field.label} secondary={field.fieldType} />
          {!hideMore && (
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={(event) => onClick(event.currentTarget, field)}>
                <MoreVertIcon />
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </ListItem>
      )}
    </Draggable>
  ));
});

interface IProps {
  title?: string;
  parentId: any;
  setFields?: (args: any) => void;
  formBuilder?: boolean;
}

const initialState = {
  showForm: false,
  showMenu: null,
  selectedField: null,
  edit: false,
  editForm: false,
};

export default function Fields({
  parentId,
  setFields,
  title = 'Fields',
  formBuilder = false,
}: IProps): any {
  const [state, setState] = useState(initialState);

  const deleteCallback = () => {
    setState({ ...state, showMenu: null, selectedField: null, edit: false });
  };
  const { data, error } = useGetFieldsByType({ parentId });

  const { handleDelete, deleteLoading } = useDeleteField({ onAlert, parentId });
  const { handleUpdatePosition, updateLoading, updatePositionInCache } = useUpdateFieldPosition({
    onAlert,
    parentId,
  });

  async function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    let fields = [...data.getFieldsByType.data];

    let position = 1010;

    if (result.destination.index === 0) {
      position = fields[0].position;
      position = parseInt(position.toString()) - 1;
    } else if (result.destination.index === fields.length - 1) {
      position = fields[fields.length - 1].position;
      position = parseInt(position.toString()) + 1;
    } else if (fields.length - 1 > result.destination.index) {
      let startPosition = 0;
      let endPosition = 0;
      if (result.source.index < result.destination.index) {
        startPosition = fields[result.destination.index].position;
        endPosition = fields[result.destination.index + 1].position;
      } else {
        startPosition = fields[result.destination.index - 1].position;
        endPosition = fields[result.destination.index].position;
      }
      position = (endPosition - startPosition) / 2 + startPosition;
    }
    // console.log('new position', position);
    let updateId = fields[result.source.index]._id;

    let tempField = fields.map((f, i) => (i === result.source.index ? { ...f, position } : f));

    tempField = reorder(tempField, result.source.index, result.destination.index);

    updatePositionInCache(tempField);
    handleUpdatePosition(updateId, position);
  }

  useEffect(() => {
    if (data && data.getFieldsByType && setFields) {
      setFields(data.getFieldsByType.data);
    }
  }, [data]);

  const formBuilderProps = {
    parentId,
    formBuilder,
    onCancel: () => setState(initialState),
    field: state.selectedField,
  };

  if (!error && (!data || !data.getFieldsByType)) {
    return <FieldsSkeleton />;
  }
  if (error) {
    return <ErrorLoading error={error} />;
  }

  return (
    <Paper variant="outlined" className="mb-2">
      <Typography variant="h5" className="d-flex align-items-center pl-2">
        {title}
        {!state.showForm && (
          <Tooltip title="Add New Field">
            <IconButton
              disabled={updateLoading}
              color="primary"
              onClick={() => setState({ ...initialState, showForm: true })}
            >
              <AddCircle />
            </IconButton>
          </Tooltip>
        )}
        {updateLoading && <CircularProgress size={25} />}
      </Typography>
      <Divider />
      {(state.showForm || (state.selectedField && state.edit)) && (
        <FieldForm {...formBuilderProps} />
      )}
      <List>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <QuoteList
                  hideMore={snapshot.isDraggingOver}
                  fields={data.getFieldsByType.data}
                  onClick={(currentTarget, field) =>
                    setState({ ...state, showMenu: currentTarget, selectedField: field })
                  }
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </List>
      <CRUDMenu
        show={state.showMenu}
        onClose={() => setState(initialState)}
        onDelete={() => {
          const anwser = confirm('Are you sure you want delete this field?');
          if (anwser) {
            setState({ ...state, showMenu: null });
            handleDelete(state.selectedField._id, deleteCallback);
          }
        }}
        onEdit={() => setState({ ...state, edit: true, showMenu: null })}
      />
      <Backdrop open={deleteLoading} />
    </Paper>
  );
}
