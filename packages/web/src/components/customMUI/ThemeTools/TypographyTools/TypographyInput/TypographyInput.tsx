import React, { useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeThemeOption,
  setThemeOption,
} from '../../../../../../../shared/redux/actions/setting';
import { Grid, Button, createTheme, adaptV4Theme } from '@mui/material';
import { getThemeValueInfo } from '../../../selectors/selectors';
import FontWeightInput from './FontWeightInput';
import FontSizeInput from './FontSizeInput';
import FontFamilyInput from './FontFamilyInput';
import LineHeightInput from './LineHeightInput';
import LetterSpacingInput from './LetterSpacingInput';
import { ThemeValueChangeEvent } from '../../events';
import { updateRemoveThemeOption, updateSetThemeOption } from '../../../commonFunc';
import { Theme } from '@mui/material';

const PREFIX = 'TypographyInput';

const classes = {
  resetButton: `${PREFIX}-resetButton`,
  disabledButton: `${PREFIX}-disabledButton`,
  inputContainer: `${PREFIX}-inputContainer`,
};

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.resetButton}`]: {
    textTransform: 'capitalize',
  },

  [`& .${classes.disabledButton}`]: {
    fontStyle: 'italic',
  },

  [`& .${classes.inputContainer}`]: {
    flex: 1,
  },
}));

export default function TypographyInput({ label, variantPath, property }) {
  const path = `${variantPath}.${property}`;
  const initialTheme = useSelector(({ setting }: any) => setting);
  const themeOptions = createTheme(adaptV4Theme(initialTheme.theme));
  const themeValueInfo = getThemeValueInfo(path, themeOptions, initialTheme.theme);
  const dispatch = useDispatch();

  // const handleValueChange = useCallback(
  //   (event, value) => {
  //     dispatch(setThemeOption(path, value))
  //   },
  //   [dispatch]
  // )

  const handleValueChange = (event, value) => {
    const updateTheme = updateSetThemeOption(path, value);
    dispatch(setThemeOption(updateTheme));
    document.dispatchEvent(ThemeValueChangeEvent());
  };

  // const handleReset = useCallback(() => dispatch(removeThemeOption(path)), [
  //   dispatch,
  // ])

  const handleReset = () => {
    const updateTheme = updateRemoveThemeOption(path);
    dispatch(removeThemeOption(updateTheme));
  };

  return (
    <Grid container justifyContent="space-between" alignItems="baseline">
      <Grid item className={classes.inputContainer}>
        <TypographyPropertyInput
          property={property}
          value={themeValueInfo.value}
          onChange={handleValueChange}
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

function TypographyPropertyInput({ property, value, onChange }) {
  switch (property) {
    case 'fontFamily':
      return <FontFamilyInput value={value} onChange={onChange} />;
    case 'htmlFontSize':
    case 'fontSize':
      return <FontSizeInput value={value} onChange={onChange} property={property} />;
    case 'fontWeight':
    case 'fontWeightLight':
    case 'fontWeightMedium':
    case 'fontWeightRegular':
    case 'fontWeightBold':
      return <FontWeightInput value={value} onChange={onChange} property={property} />;
    case 'letterSpacing':
      return <LetterSpacingInput value={value} onChange={onChange} property={property} />;
    case 'lineHeight':
      return <LineHeightInput value={value} onChange={onChange} />;
    default:
      return <Root></Root>;
  }
}
