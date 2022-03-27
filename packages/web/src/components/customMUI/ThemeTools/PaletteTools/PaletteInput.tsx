import React, { useCallback } from 'react';
import ColorInput from '../../ColorInput/ColorInput';
import { useDispatch, useSelector } from 'react-redux';
import { removeThemeOption, setThemeOption } from '../../../../../../shared/redux/actions/setting';
import {
  Grid,
  Typography,
  Button,
  makeStyles,
  Theme,
  createStyles,
  createMuiTheme,
} from '@material-ui/core';
import { getThemeValueInfo } from '../../selectors/selectors';
import { updateSetThemeOption, updateRemoveThemeOption } from '../../commonFunc';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    resetButton: {
      textTransform: 'capitalize',
    },
    disabledButton: {
      fontStyle: 'italic',
    },
  }),
);

export default function PaletteInput({ label, path }) {
  const initialTheme = useSelector(({ setting }: any) => setting);
  const classes = useStyles();
  const themeOptions = createMuiTheme(initialTheme.theme);
  const themeValueInfo = getThemeValueInfo(path, themeOptions, initialTheme.theme);
  const dispatch = useDispatch();

  const handleColorChange = (color) => {
    const updateTheme = updateSetThemeOption(path, color);
    dispatch(setThemeOption(updateTheme));
  };

  const handleReset = () => {
    const updateTheme = updateRemoveThemeOption(path);
    dispatch(removeThemeOption(updateTheme));
  };

  return (
    <Grid container justify="space-between" alignItems="flex-end">
      <Grid item>
        <ColorInput
          label={label}
          color={themeValueInfo.value}
          onColorChange={(e: any) => handleColorChange(e)}
        />
      </Grid>
      <Grid item>
        <Button
          size="small"
          disabled={!themeValueInfo.modifiedByUser}
          classes={{
            root: classes.resetButton,
            disabled: classes.disabledButton,
          }}
          onClick={handleReset}
        >
          {themeValueInfo.modifiedByUser ? 'Reset' : 'auto'}
        </Button>
      </Grid>
    </Grid>
  );
}
