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
import InputGroup from '../../common/InputGroup';
import Board from './Board';
import { defaultBoard } from './defaultBoard';

interface IProps {
  boards: any[];
  onBoardsChange: (boards: any) => void;
}

const initialState = {
  selectedBoard: null,
};

export default function BoardsTab({ boards = [], onBoardsChange }: IProps) {
  const [state, setState] = useState(initialState);

  const handleAddBoard = () => {
    const newBoard = defaultBoard;
    const newBoards = [...boards, newBoard];
    onBoardsChange(newBoards);
    setState({ ...state, selectedBoard: newBoard });
  };

  const handleSave = () => {
    onBoardsChange(
      boards?.map((board) =>
        board?._id === state.selectedBoard?._id ? state.selectedBoard : board,
      ),
    );
    setState(initialState);
  };

  const handleDelete = (_id) => {
    onBoardsChange(boards?.filter((board) => board?._id !== _id));
  };

  return (
    <Paper variant="outlined">
      {state.selectedBoard ? (
        <div className="p-1">
          <InputGroup>
            <Button size="small" variant="contained" onClick={handleSave}>
              Save
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => setState(initialState)}
              className="ml-2"
            >
              Cancel
            </Button>
          </InputGroup>
          <Board
            editMode
            board={state.selectedBoard}
            onBoardChange={(selectedBoard) => setState({ ...state, selectedBoard })}
          />
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
                <ListItemText primary={board?.title || 'Board Title'} />
                <ListItemSecondaryAction>
                  <DeleteButton onClick={() => handleDelete(board?._id)} />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Paper>
  );
}
