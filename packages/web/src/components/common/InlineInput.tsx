import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Edit from '@mui/icons-material/Edit';
import Close from '@mui/icons-material/Close';
import Check from '@mui/icons-material/Check';
import { useState } from 'react';

interface IProps {
  placeholder: string;
  value: string;
  onChange: (e: any) => void;
}

const initialState = { value: '', edit: false };

export default function InlineInput({ placeholder, onChange, value }: IProps) {
  const [state, setState] = useState(initialState);
  return (
    <div className="d-flex align-items-center w-100">
      {state.edit ? (
        <>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder={placeholder}
            value={state.value}
            onChange={({ target }) => setState({ ...state, value: target.value })}
          />
          <IconButton
            size="small"
            className="px-2"
            onClick={() => {
              onChange({ target: { value: state.value } });
              setState(initialState);
            }}
          >
            <Check />
          </IconButton>
          <IconButton size="small" onClick={() => setState(initialState)}>
            <Close />
          </IconButton>
        </>
      ) : (
        <>
          {value}
          <IconButton size="small" onClick={() => setState({ ...state, value, edit: true })}>
            <Edit />
          </IconButton>
        </>
      )}
    </div>
  );
}
