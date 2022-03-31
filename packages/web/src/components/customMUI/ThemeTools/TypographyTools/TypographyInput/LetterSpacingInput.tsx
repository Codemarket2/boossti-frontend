import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { Theme } from '@mui/material';

const PREFIX = 'LetterSpacingInput';

const classes = {
  disabledText: `${PREFIX}-disabledText`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.disabledText}`]: {
    fontStyle: 'italic',
  },
}));

const getLetterSpacingValue = (letterSpacing: string) => {
  if (letterSpacing == null || letterSpacing.endsWith('rem') || !letterSpacing.endsWith('em')) {
    return undefined;
  }
  return parseFloat(letterSpacing.slice(0, -2));
};

function LetterSpacingInput({ value, onChange, property }) {
  const [displayValue, setDisplayValue] = useState<number | undefined>(undefined);

  useEffect(() => setDisplayValue(getLetterSpacingValue(value)), [value]);

  const disabled = displayValue == undefined;

  return (
    <Root>
      <Grid container justifyContent="space-between" alignItems="baseline">
        <Grid item>
          <Typography variant="caption" color="textSecondary">
            Letter Spacing:
          </Typography>
        </Grid>
        <Grid item>
          {!disabled && <Typography display="inline">{`${displayValue}em`}</Typography>}
        </Grid>
      </Grid>
      <Slider
        value={disabled ? 0 : displayValue}
        disabled={disabled}
        min={-0.1}
        max={1.5}
        step={0.01}
        onChange={(event, newDisplayValue) =>
          setDisplayValue(newDisplayValue as number | undefined)
        }
        onChangeCommitted={(event, newValue) => onChange(event, `${newValue}em`)}
      />
      {disabled && (
        <Typography color="textSecondary" variant="caption" className={classes.disabledText}>
          Only em units supported. Use the code editor to configure other types.
        </Typography>
      )}
    </Root>
  );
}

export default LetterSpacingInput;
