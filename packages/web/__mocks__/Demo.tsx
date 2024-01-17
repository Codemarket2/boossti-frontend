import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputGroup from '../src/components/common/InputGroup';

const initialState = { name: '', stack: '', validate: false, success: false, counter: 0 };

export default function home() {
  const [state, setState] = useState(initialState);

  const onSubmit = () => {
    if (!state.name || !state.stack) {
      setState({ ...state, validate: true });
    } else {
      setState({ ...initialState, success: true });
    }
  };

  return (
    <div className="container">
      <div>
        <h1>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <p data-testid="caption">Frontend App</p>
      </div>
      <div>
        <InputGroup>
          <TextField
            size="small"
            fullWidth
            value={state.name}
            onChange={({ target }) => setState({ ...state, name: target?.value, success: false })}
            label="name"
            inputProps={{ 'data-testid': 'name-input' }}
            error={state.validate && !state.name}
            helperText={state.validate && !state.name && 'Name is required field'}
          />
        </InputGroup>
        <InputGroup>
          <FormControl fullWidth size="small">
            <InputLabel id="stack-select-label">Stack</InputLabel>
            <Select
              data-testid="stack-select-input"
              inputProps={{ 'data-testid': 'stack-input' }}
              labelId="stack-select-label"
              id="demo-simple-select"
              value={state.stack}
              label="Stack"
              onChange={({ target }) =>
                setState({ ...state, stack: target?.value, success: false })
              }
            >
              <MenuItem value="Frontend">Frontend</MenuItem>
              <MenuItem value="Backend">Backend</MenuItem>
              <MenuItem value="Full Stack">Full Stack</MenuItem>
            </Select>
          </FormControl>
        </InputGroup>
        {state.success && (
          <Typography data-testid="success-message">Thank you for submitting the form</Typography>
        )}
        <InputGroup>
          <Button
            size="small"
            variant="contained"
            data-testid="submit-button"
            onClick={onSubmit}
            disabled={!state.name || !state.stack}
          >
            Submit
          </Button>
        </InputGroup>
      </div>
      <div>
        <p data-testid="counter">{state.counter}</p>
        <Button
          size="small"
          variant="contained"
          data-testid="counter-button"
          onClick={() => setState({ ...state, counter: state.counter + 1 })}
        >
          Counter ++
        </Button>
      </div>
      <TextField
        fullWidth
        value={state.name}
        onChange={({ target }) => setState({ ...state, name: target.value })}
        multiline
        rows={4}
      />
    </div>
  );
}
