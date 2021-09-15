import AddCircle from '@material-ui/icons/AddCircle';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
  useGetFieldsByType,
  useDeleteField,
  useUpdateFieldPosition,
} from '@frontend/shared/hooks/field';
import FieldForm from './FieldForm';
import CRUDMenu from '../common/CRUDMenu';
import { useState, memo } from 'react';
import FieldsSkeleton from './FieldsSkeleton';
import ErrorLoading from '../common/ErrorLoading';
import Backdrop from '../common/Backdrop';
import { onAlert } from '../../utils/alert';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface IProps {
  parentId: any;
}

const initialState = {
  showForm: false,
  showMenu: null,
  selectedField: null,
  edit: false,
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

function Quote({ field, index, onClick }: any) {
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
          <ListItemText primary={field.label} secondary={`${field.position}-${field.fieldType}`} />
          <ListItemSecondaryAction>
            <IconButton edge="end" onClick={(event) => onClick(event.currentTarget, field)}>
              <MoreHoriz />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )}
    </Draggable>
  );
}

const QuoteList = memo(function QuoteList({ fields, onClick }: any) {
  return (
    <List>
      {fields.map((field: any, index: number) => (
        <Quote field={field} index={index} key={field._id} onClick={onClick} />
      ))}
    </List>
  );
});

export default function Fields({ parentId }: IProps) {
  const [state, setState] = useState(initialState);

  const deleteCallback = () => {
    setState({ ...state, showMenu: null, selectedField: null, edit: false });
  };
  const { data, loading, error } = useGetFieldsByType({ parentId });

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
                disabled={updateLoading}
                color="primary"
                onClick={() => setState({ ...initialState, showForm: true })}>
                <AddCircle />
              </IconButton>
            </Tooltip>
          )}
          {updateLoading && <CircularProgress size={25} />}
        </Typography>
        {state.showForm && (
          <FieldForm parentId={parentId} onCancel={() => setState(initialState)} />
        )}
        {state.selectedField && state.edit && (
          <FieldForm
            field={state.selectedField}
            parentId={parentId}
            onCancel={() => setState(initialState)}
          />
        )}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <QuoteList
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
