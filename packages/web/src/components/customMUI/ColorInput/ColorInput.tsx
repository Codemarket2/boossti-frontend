import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { TextField, InputAdornment, Popover, Theme } from '@mui/material';
import { ChromePicker } from 'react-color';
import MaterialColorPicker from './MaterialColorPicker';
import { colorFromString } from './utils';

const PREFIX = 'ThemeValueChangeEvent';

const classes = {
  popoverPaper: `${PREFIX}-popoverPaper`,
  colorSampleAdornment: `${PREFIX}-colorSampleAdornment`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.popoverPaper}`]: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 0,
    alignItems: 'center',
  },

  [`& .${classes.colorSampleAdornment}`]: {
    width: '1em',
    height: '1em',
    border: '1px solid grey',
  },
}));

export const ThemeValueChangeEvent = () => new Event('change-save-point');

/**
 * The base TextField input for selecting colors.
 * onClick opens a popover with components to help pick colors
 */
export default function ColorInput({ label, color, onColorChange }) {
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

  const handleOpenPopover = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    document.dispatchEvent(ThemeValueChangeEvent());
  };

  const handleColorChange = (value: string) => onColorChange(value);

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const pastedText = event.clipboardData.getData('text');
    const color = colorFromString(pastedText);
    if (color) {
      handleColorChange(color);
    }
  };

  const popoverOpen = Boolean(anchorEl);
  return (
    <div>
      <TextField
        label={label}
        onClick={handleOpenPopover}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <div
                className={classes.colorSampleAdornment}
                style={{
                  backgroundColor: color,
                }}
              />
            </InputAdornment>
          ),
        }}
        InputLabelProps={{ shrink: true }}
        size="small"
        value={color}
        onPaste={handlePaste}
      />
      <Popover
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        PaperProps={{
          className: classes.popoverPaper,
        }}
        disableAutoFocus
        disableEnforceFocus
      >
        <ColorPicker color={color} onChangeComplete={handleColorChange} />
      </Popover>
    </div>
  );
}

/**
 * Creates the ChromePicker and MaterialColorPicker and
 * handles/formats events from ChromePicker
 */
function ColorPicker({ color, onChangeComplete }) {
  const [inputValue, setInputValue] = React.useState<string | null>('#fff');
  useEffect(() => {
    setInputValue(color);
  }, [color]);

  const handleChange = (colorObject, event) => {
    if (colorObject.rgb.a === 1) {
      setInputValue(colorObject.hex);
      return colorObject.hex;
    } 
      const rgb = `rgba(${colorObject.rgb.r},${colorObject.rgb.g},${colorObject.rgb.b},${colorObject.rgb.a})`;
      setInputValue(rgb);
      return rgb;
    
  };

  const handleChangeComplete = (colorObject, event) => {
    const colorString = handleChange(colorObject, event);
    onChangeComplete(colorString);
  };

  return (
    <Root>
      <MaterialColorPicker color={inputValue} onChangeComplete={onChangeComplete} />
      <ChromePicker
        color={inputValue}
        onChange={handleChange}
        onChangeComplete={handleChangeComplete}
      />
    </Root>
  );
}
