// WEB
import { DisplayFormSettings } from '../form2/DisplayForm';

export const CopytoClipboard = (text: string) => navigator.clipboard.writeText(text);

export const getSrcURL = (formSettings: DisplayFormSettings, formSlug: string) => {
  const URL = `${window.location.origin}/embed/forms/${formSlug}`;
  const Query = `?settings=${btoa(JSON.stringify(formSettings))}`;

  return URL + Query;
};

interface GetEmbedLinkProps {
  IFrameTagConfig?: {
    width?: number;
    height?: number;
  };
  /** Embedded Form Settings */
  FormSettings: DisplayFormSettings;
  formSlug: string;
}

export const getEmbedLink = (config: GetEmbedLinkProps) => {
  const { IFrameTagConfig: IFrameConfig, FormSettings, formSlug } = config;

  const link = getSrcURL(FormSettings, formSlug);

  return [
    '<iframe',
    `src="${link}"`,
    `width="${IFrameConfig?.width || 500}"`,
    `height="${IFrameConfig?.height || 500}"`,
    `>`,
    `</iframe>`,
  ].join('\n');
};

export const updateBrowserURL = (formSettings: DisplayFormSettings, formSlug: string) => {
  if (window && window.history) {
    const NEW_URL = getSrcURL(formSettings, formSlug);
    window.history.pushState({ page: NEW_URL }, '', NEW_URL);
  }
};

export type TSettingsPropOptions = {
  title: string;
  value: any;
};

export const SettingWidgetTypeOptions: TSettingsPropOptions[] = [
  {
    title: 'Both',
    value: 'both',
  },
  {
    title: 'Form',
    value: 'form',
  },
  {
    title: 'Response',
    value: 'response',
  },
];

export const SettingFormViewOptions: TSettingsPropOptions[] = [
  {
    title: 'Full Form',
    value: 'fullForm',
  },
  {
    title: 'oneField',
    value: 'oneField',
  },
  {
    title: 'Leaderboard',
    value: 'leaderboard',
  },
  {
    title: 'Button',
    value: 'button',
  },
  {
    title: 'Select Item',
    value: 'selectItem',
  },
];

export const SettingWhoCanSubmitOptions: TSettingsPropOptions[] = [
  {
    title: 'All',
    value: 'all',
  },
  {
    title: 'Authenticated User',
    value: 'authUser',
  },
];

export const SettingResponseViewOptions: TSettingsPropOptions[] = [
  {
    title: 'Button',
    value: 'button',
  },
  {
    title: 'Table',
    value: 'table',
  },
  {
    title: 'Table 2',
    value: 'table2',
  },
  {
    title: 'Vertical',
    value: 'vertical',
  },
];

export const SettingWhoCanViewResponsesOptions: TSettingsPropOptions[] = [
  {
    title: 'All',
    value: 'all',
  },
  {
    title: 'Authenticated User',
    value: 'authUser',
  },
];

export const SettingonlyMyResponsesOptions: TSettingsPropOptions[] = [
  {
    title: 'True',
    value: true,
  },
  {
    title: 'False',
    value: false,
  },
];
