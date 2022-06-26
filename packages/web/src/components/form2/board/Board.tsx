import AddCircle from '@mui/icons-material/AddCircle';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { generateObjectId } from '@frontend/shared/utils/objectId';
import {
  Button,
  Card,
  Dialog,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import Close from '@mui/icons-material/Close';
import BoardForm from './ColumnForm';
import DisplayRichText from '../../common/DisplayRichText';
import InputGroup from '../../common/InputGroup';

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

const initialState = {
  anchorEl: null,
  columnMenuAnchor: null,
  column: null,
  columnId: null,
  item: null,
  addItem: false,
  previewMode: false,
};

interface IProps {
  board: any;
  onBoardChange?: (board: any) => void;
  editMode?: boolean;
  onClose?: () => void;
}

export default function Board({
  editMode: tempEditMode = false,
  board,
  onBoardChange,
  onClose,
}: IProps) {
  const [state, setState] = useState(initialState);
  const editMode = tempEditMode && state.previewMode ? !state.previewMode : tempEditMode;

  if (!board?.columns) {
    return <Typography textAlign="center">Board columns not found!</Typography>;
  }
  const { columns } = board;

  const setColumns = (newColumns) => {
    onBoardChange({ ...board, columns: newColumns });
  };

  const handleDelete = () => {
    const newColumns = { ...columns };
    if (state.item?._id) {
      newColumns[state.columnId] = {
        ...state.column,
        items: newColumns[state.columnId]?.items?.filter((item) => item?._id !== state.item?._id),
      };
    } else {
      delete newColumns[state.columnId];
    }
    setColumns(newColumns);
    setState(initialState);
  };

  const handleSave = (value) => {
    let newColumns = { ...columns };
    if (state.addItem || state?.item?.title) {
      let items = [...newColumns[state.columnId]?.items];
      if (state.item?._id) {
        items = items?.map((item) =>
          item?._id === state.item?._id ? { ...item, ...value } : item,
        );
      } else {
        items = [...items, { ...value, _id: generateObjectId() }];
      }
      newColumns[state.columnId] = {
        ...state.column,
        items,
      };
    } else if (state.columnId) {
      newColumns[state.columnId] = {
        ...state.column,
        title: value?.title,
        backgroundColor: value.backgroundColor,
      };
    } else {
      newColumns = {
        ...newColumns,
        [generateObjectId()]: {
          title: value?.title,
          backgroundColor: value.backgroundColor,
          items: [],
        },
      };
    }

    setColumns(newColumns);
    setState(initialState);
  };

  return (
    <div style={{ width: '100%', overflowX: 'scroll' }}>
      <div className="d-flex align-items-center position-absolute">
        {onClose && (
          <>
            <Button
              startIcon={<Close />}
              size="small"
              color="error"
              onClick={onClose}
              className="mr-2"
            >
              Close
            </Button>
            <Typography variant="h6">
              {board.title || 'Title'}
              {editMode && (
                <Tooltip title="Edit board title">
                  <IconButton size="small">
                    <Edit fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Typography>
          </>
        )}

        <div className="position-absolut">
          {editMode && (
            <Tooltip title="Add column">
              <IconButton
                size="small"
                color="primary"
                onClick={(event) => setState({ ...initialState, anchorEl: event.currentTarget })}
                disabled={Boolean(state.anchorEl)}
              >
                <AddCircle />
              </IconButton>
            </Tooltip>
          )}
          {(editMode || state.previewMode) && (
            <Tooltip title="Toggle preview mode">
              <IconButton
                edge="end"
                size="small"
                onClick={(event) => setState({ ...initialState, previewMode: !state.previewMode })}
                disabled={Boolean(state.anchorEl)}
              >
                {state.previewMode ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>
      {editMode && columns.length < 1 && (
        <Typography textAlign="center" className="mt-5">
          Please add columns to the board
        </Typography>
      )}
      {editMode && (
        <>
          {state.anchorEl && (
            <Dialog
              open={Boolean(state.anchorEl)}
              onClose={() => setState(initialState)}
              BackdropProps={{
                style: {
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                },
              }}
            >
              <BoardForm
                formTitle={
                  state.addItem
                    ? state?.item?._id
                      ? 'Edit Item'
                      : 'Add Item'
                    : state?.column?.title
                    ? 'Edit Column'
                    : 'Add Column'
                }
                value={state.addItem || state?.item?._id ? state?.item : state?.column}
                isItem={state.addItem || state?.item?._id}
                onSave={handleSave}
                onCancel={() => setState(initialState)}
              />
            </Dialog>
          )}
          {state.columnMenuAnchor && (
            <Menu
              anchorEl={state.columnMenuAnchor}
              open={Boolean(state.columnMenuAnchor)}
              onClose={() => setState(initialState)}
            >
              <MenuItem
                onClick={() => {
                  setState({ ...state, anchorEl: state.columnMenuAnchor, columnMenuAnchor: null });
                }}
              >
                Edit
              </MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
              {!state.item?._id && (
                <MenuItem
                  onClick={() =>
                    setState({
                      ...state,
                      anchorEl: state.columnMenuAnchor,
                      columnMenuAnchor: null,
                      addItem: true,
                    })
                  }
                >
                  Add Item
                </MenuItem>
              )}
            </Menu>
          )}
        </>
      )}
      <div className="d-flex mt-5">
        <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([columnId, column]: any) => {
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                key={columnId}
              >
                <Typography variant="h5">
                  {column.title}
                  {editMode && (
                    <IconButton
                      size="small"
                      onClick={(event) =>
                        setState({
                          ...initialState,
                          columnMenuAnchor: event.currentTarget,
                          column,
                          columnId,
                        })
                      }
                      disabled={Boolean(state.columnMenuAnchor)}
                    >
                      <MoreHoriz fontSize="small" />
                    </IconButton>
                  )}
                </Typography>
                <div className="m-1">
                  <Droppable droppableId={columnId} key={columnId} isDropDisabled={!editMode}>
                    {(provided, snapshot) => {
                      return (
                        <Paper
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          variant="outlined"
                          className="p-1"
                          square
                          style={{
                            background: snapshot.isDraggingOver
                              ? 'lightblue'
                              : column.backgroundColor || 'lightgrey',
                            width: 250,
                            minHeight: 250,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item._id}
                                draggableId={item._id}
                                index={index}
                                isDragDisabled={!editMode}
                              >
                                {(provided2, snapshot2) => {
                                  return (
                                    <Card
                                      ref={provided2.innerRef}
                                      {...provided2.draggableProps}
                                      {...provided2.dragHandleProps}
                                      variant="outlined"
                                      className="p-1 mt-1"
                                      style={{
                                        userSelect: 'none',
                                        minHeight: '50px',
                                        backgroundColor: snapshot2.isDragging
                                          ? '#d3d8db'
                                          : item.backgroundColor || 'white',
                                        ...provided2.draggableProps.style,
                                      }}
                                    >
                                      <Typography fontWeight="bold">
                                        {item.title}
                                        {editMode && (
                                          <IconButton
                                            size="small"
                                            onClick={(event) =>
                                              setState({
                                                ...initialState,
                                                columnMenuAnchor: event.currentTarget,
                                                item,
                                                column,
                                                columnId,
                                              })
                                            }
                                            disabled={Boolean(state.columnMenuAnchor)}
                                          >
                                            <MoreHoriz fontSize="small" />
                                          </IconButton>
                                        )}
                                      </Typography>
                                      <DisplayRichText value={item.description} />
                                    </Card>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </Paper>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}
