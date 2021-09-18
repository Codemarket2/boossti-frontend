export const UPDATE_SETTING = 'UPDATE_SETTING';

export interface IAttributes {
  bottomDrawer: boolean;
}

export function updateSettingAction(payload: IAttributes) {
  return {
    type: UPDATE_SETTING,
    payload,
  };
}
