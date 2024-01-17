import { Button, FormLabel, IconButton, TextField, Typography } from '@mui/material';
import Brightness1 from '@mui/icons-material/Brightness1';
import { SketchPicker } from 'react-color';
import Paper from '@mui/material/Paper';
import React, { FormEvent, useEffect, useState } from 'react';
import InputGroup from '../../common/InputGroup';
import RichTextarea2 from '../../common/RichTextarea2';

interface IValue {
  title: string;
  description: string;
  backgroundColor: string;
}

interface IProps {
  formTitle: string;
  value?: IValue;
  onSave: (value: IValue) => void;
  onCancel: () => void;
  isItem: boolean;
}

export default function BoardForm({ formTitle, value, onSave, onCancel, isItem }: IProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [state, setState] = useState<IValue>({
    title: '',
    description: '',
    backgroundColor: isItem ? '#FCFE7D' : '#D3D3D3',
  });

  useEffect(() => {
    if (value) {
      setState({ ...state, ...value });
    }
  }, [value]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(state);
  };

  return (
    <Paper className="p-2" style={{ minWidth: 250 }}>
      <Typography>{formTitle}</Typography>
      <form onSubmit={onSubmit}>
        <InputGroup>
          <TextField
            fullWidth
            size="small"
            label="title"
            value={state.title}
            onChange={({ target }) => setState({ ...state, title: target.value })}
            required
          />
        </InputGroup>
        <InputGroup>
          <FormLabel>Background color</FormLabel>
          <IconButton
            className="ml-2 p-0"
            onClick={() => setShowColorPicker(!showColorPicker)}
            style={{ border: '1px solid grey' }}
            size="small"
          >
            <Brightness1 fontSize="large" style={{ color: state.backgroundColor }} />
          </IconButton>
          {showColorPicker && (
            <SketchPicker
              color={state.backgroundColor}
              onChangeComplete={(color) => setState({ ...state, backgroundColor: color.hex })}
            />
          )}
        </InputGroup>
        {isItem && (
          <div>
            <RichTextarea2
              value={state.description}
              onChange={(newValue) => setState({ ...state, description: newValue })}
            />
          </div>
        )}
        <InputGroup>
          <Button size="small" variant="contained" type="submit">
            Save
          </Button>
          <Button size="small" variant="outlined" onClick={onCancel} className="ml-2">
            Cancel
          </Button>
        </InputGroup>
      </form>
    </Paper>
  );
}
