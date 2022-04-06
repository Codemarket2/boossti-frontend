import React, { useState, FormEvent, useCallback } from 'react';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
// import { addFonts } from "../../../../../../shared/redux/actions/muiActions"
import { InputAdornment, CircularProgress, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function AddFontInput() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleAddFontName = () => {
    console.log('handleAddFontName');
  };
  // const handleAddFontName = useCallback(
  //   (event: FormEvent<HTMLFormElement>) => {
  //     event.preventDefault()
  //     event.persist()
  //     const fontName: string = event.target["fontname"].value
  //     setLoading(true)
  //     dispatch(addFonts([fontName])).then(loaded => {
  //       setLoading(false)
  //       if (loaded) {
  //         event.target["fontname"].value = ""
  //       } else {
  //         setError(true)
  //       }
  //     })
  //   },
  //   [dispatch]
  // )

  return (
    <form onSubmit={handleAddFontName} autoComplete="off">
      <Typography variant="body2">Add Fonts</Typography>
      <TextField
        name="fontname"
        // label="Add Fonts"
        error={error}
        helperText={
          error ? (
            'Error loading font'
          ) : (
            <>
              {`Enter the name of a `}
              <Link href="https://fonts.google.com/" target="_blank" rel="noreferrer">
                Google Font
              </Link>
            </>
          )
        }
        onClick={(event) => event.stopPropagation()}
        onChange={() => setError(false)}
        // InputLabelProps={{ shrink: true }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AddIcon />
            </InputAdornment>
          ),
          endAdornment: loading && (
            <InputAdornment position="end">
              <CircularProgress size="1.5rem" />
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}

export default AddFontInput;
