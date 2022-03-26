import { store } from '@frontend/shared/redux';
import { getByPath, removeByPath, setByPath } from './utils';
import { createMuiTheme, Theme } from '@material-ui/core';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export const defaultTheme: Theme = createMuiTheme();

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
  let updatedThemeOptions: ThemeOptions;

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
