import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Edit from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';
import Check from '@material-ui/icons/Check';
import { useState } from 'react';
// import styled from 'styled-components';

// const StyledInput = styled.input`
//   color: ${(props) => props.theme.palette.text.primary};
//   background: rgba(0, 0, 0, 0);
//   border: none;
//   outline: none;
//   margin-right: 10px;
//   width: ${(props) => props.width};
// `;

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
