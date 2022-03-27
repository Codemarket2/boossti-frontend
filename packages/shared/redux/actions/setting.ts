import { dark, light } from '../../../web/src/utils/theme/palette';

export const UPDATE_SETTING = 'UPDATE_SETTING';
export const UPDATE_THEME = 'UPDATE_THEME';
export const SET_DEFAULT_THEME = 'SET_DEFAULT_THEME';

export interface IAttributes {
  bottomDrawer?: boolean;
  metaTags?: {
    image: string;
    description: string;
    title: string;
  };
  editMode?: boolean;
  theme?: {};
}

export function updateSettingAction(payload: IAttributes) {
  return {
    type: UPDATE_SETTING,
    payload,
  };
}

export function setDefaultThemeAction(payload: boolean) {
  const value = light;
  return {
    type: SET_DEFAULT_THEME,
    value,
  };
}

export function setThemeOption(updatedThemeOptions: any) {
  return {
    type: UPDATE_THEME,
    theme: updatedThemeOptions,
  };
}

export function removeThemeOption(updatedThemeOptions: any) {
  return {
    type: UPDATE_THEME,
    theme: updatedThemeOptions,
  };
}
