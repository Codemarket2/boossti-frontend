import { store } from '@frontend/shared/redux';
import { getByPath, removeByPath, setByPath } from './utils';
import { createTheme, Theme } from '@mui/material';
import { DeprecatedThemeOptions } from '@mui/material/styles';

export const defaultTheme: Theme = createTheme();

export const setDefaultTheme = async () => {
  const darkModePersisted = await localStorage.getItem('darkMode');
  return darkModePersisted;
};

export const updateSetThemeOption = (path, value) => {
  return setByPath(store.getState().setting.theme, path, value);
};

export const updateSetThemeOptions = (configs) => {
  let updatedThemeOptions = store.getState().setting.theme;
  configs.forEach(
    ({ path, value }) => (updatedThemeOptions = setByPath(updatedThemeOptions, path, value)),
  );
  return updatedThemeOptions;
};

export const updateRemoveThemeOptions = (configs) => {
  let updatedThemeOptions = store.getState().setting.theme;
  configs.forEach(
    ({ path, value }) => (updatedThemeOptions = removeByPath(updatedThemeOptions, path)),
  );
  return updatedThemeOptions;
};

export const updateRemoveThemeOption = (path) => {
  let updatedThemeOptions: DeprecatedThemeOptions;

  const parentPath = path.substring(0, path.lastIndexOf('.'));

  if (path.endsWith('main')) {
    const defaultValueForPath = getByPath(defaultTheme, path);
    updatedThemeOptions = setByPath(store.getState().setting.theme, path, defaultValueForPath);
  } else {
    // remove the key from the themeOptions (immutably)
    updatedThemeOptions = removeByPath(store.getState().setting.theme, path);
  }

  return updatedThemeOptions;
};
