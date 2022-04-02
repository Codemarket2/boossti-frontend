import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';

const PREFIX = 'FontSizeInput';

const classes = {
  valueLabel: `${PREFIX}-valueLabel`,
  disabledText: `${PREFIX}-disabledText`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.valueLabel}`]: {
    marginRight: theme.spacing(),
  },

  [`& .${classes.disabledText}`]: {
    fontStyle: 'italic',
  },
}));

const supportedFontSizeTypes = ['rem', 'em', 'px', 'pt'];
const fontSizeSliderProps: Record<string, object> = {
  px: { min: 5, max: 200 },
  pt: { min: 5, max: 200 },
  em: { min: 0.5, max: 10, step: 0.1 },
  rem: { min: 0.5, max: 10, step: 0.1 },
};

const getFontSizeUnit = (value) => {
  if (typeof value === 'string') {
    if (value.endsWith('pt')) {
      return 'pt';
    } if (value.endsWith('rem')) {
      return 'rem';
    } if (value.endsWith('em')) {
      return 'em';
    } 
      return undefined;
    
  }
  return 'px';
};

const getFontSizeValue = (value, fontSizeUnit) => {
  if (fontSizeUnit == undefined) {
    return 0;
  }
  return typeof value === 'string'
    ? parseFloat(value.substring(0, value.lastIndexOf(fontSizeUnit)))
    : value;
};

const titles: Record<string, string> = {
  fontSize: 'Font Size',
  htmlFontSize: 'HTML Font Size',
};

function FontSizeInput({ value, onChange, property }) {
  const [fontSizeUnit, setFontSizeUnit] = useState<string | undefined>(getFontSizeUnit(value));
  const [displayValue, setDisplayValue] = useState(getFontSizeValue(value, fontSizeUnit));

  useEffect(() => {
    const unit = getFontSizeUnit(value);
    setFontSizeUnit(unit);
    setDisplayValue(getFontSizeValue(value, unit));
  }, [value]);

  const disabled = fontSizeUnit == null;
  const sliderProps = disabled ? {} : fontSizeSliderProps[fontSizeUnit!];

  return (
    <Root>
      <Grid container justifyContent="space-between" alignItems="baseline">
        <Grid item>
          <Typography variant="caption" color="textSecondary">
            {titles[property]}
          </Typography>
        </Grid>
        <Grid item>
          {!disabled && (
            <Typography display="inline" className={classes.valueLabel}>
              {displayValue}
            </Typography>
          )}
          <Select
            disabled={disabled}
            value={fontSizeUnit || ''}
            onChange={(event) => {
              setFontSizeUnit(event.target.value as string | undefined);
              onChange(
                event,
                event.target.value === 'px' ? displayValue : `${displayValue}${event.target.value}`,
              );
            }}
            margin="dense"
          >
            {supportedFontSizeTypes.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      <Slider
        value={displayValue}
        disabled={disabled}
        {...sliderProps}
        onChange={(event, newDisplayValue) => setDisplayValue(newDisplayValue)}
        onChangeCommitted={(event, newValue) =>
          onChange(event, fontSizeUnit === 'px' ? newValue : `${newValue}${fontSizeUnit}`)
        }
      />
      {disabled && (
        <Typography color="textSecondary" variant="caption" className={classes.disabledText}>
          Only em units supported. Use the code editor to configure other types.
        </Typography>
      )}
    </Root>
  );
}

export default FontSizeInput;
