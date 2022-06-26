import { generateObjectId } from '@frontend/shared/utils/objectId';
import { Close } from '@mui/icons-material';
import AddCircle from '@mui/icons-material/AddCircle';
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import DeleteButton from '../../common/DeleteButton';
import { DisplayForm } from '../DisplayForm';
import Board from './Board';
import { defaultBoard } from './defaultBoard';

interface IProps {
  formId: string;
  boards: any[];
  onBoardsChange: (boards: any) => void;
}

const initialState = {
  selectedBoard: null,
};

export default function BoardsTab({ formId, boards = [], onBoardsChange }: IProps) {
  const [state, setState] = useState(initialState);

  const handleAddBoard = () => {
    const newBoard = { ...defaultBoard, _id: generateObjectId() };
    const newBoards = [...boards, newBoard];
    onBoardsChange(newBoards);
    setState({ ...state, selectedBoard: newBoard });
  };

  const handleDelete = (_id) => {
    onBoardsChange(boards?.filter((board) => board?._id !== _id));
  };

  return (
    <Paper variant="outlined" className="p-1">
      <DisplayForm
        slug="form-boards"
        systemValues={{ Form: formId }}
        settings={{ formView: 'button', buttonLabel: 'Add Board' }}
        valueFilter={{ 'values.form': formId }}
      />
      {/* {state.selectedBoard ? (
        <div className="p-1">
          {boards?.find((board) => board?._id === state.selectedBoard?._id) ? (
            <Board
              editMode
              board={boards?.find((board) => board?._id === state.selectedBoard?._id)}
              onBoardChange={(newBoard) =>
                onBoardsChange(
                  boards?.map((board) =>
                    board?._id === state.selectedBoard?._id ? newBoard : board,
                  ),
                )
              }
              onClose={() => setState(initialState)}
            />
          ) : (
            <Typography textAlign="center" color="error">
              Board not found, maybe was delete by other user
            </Typography>
          )}
        </div>
      ) : (
        <>
          <Typography className="pl-2">
            Boards
            <Tooltip title="Add board">
              <IconButton color="primary" onClick={handleAddBoard}>
                <AddCircle />
              </IconButton>
            </Tooltip>
          </Typography>
          <List>
            {boards?.map((board, i) => (
              <ListItem button key={i} onClick={() => setState({ ...state, selectedBoard: board })}>
                <ListItemText primary={`${i + 1}) ${board?.title || 'Board Title'}`} />
                <ListItemSecondaryAction>
                  <DeleteButton onClick={() => handleDelete(board?._id)} />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </>
      )} */}
    </Paper>
  );
}
