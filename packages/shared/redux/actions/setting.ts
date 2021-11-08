export const UPDATE_SETTING = 'UPDATE_SETTING';

export interface IAttributes {
  bottomDrawer?: boolean;
  metaTags?: {
    image: string;
    description: string;
    title: string;
  };
}

export function updateSettingAction(payload: IAttributes) {
  return {
    type: UPDATE_SETTING,
    payload,
  };
}
