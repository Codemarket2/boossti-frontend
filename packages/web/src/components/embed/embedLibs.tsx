import type { ParsedUrlQuery } from 'node:querystring';

// WEB
import { DisplayFormSettings } from '../form2/DisplayForm';

export const CopytoClipboard = (text: string) => navigator.clipboard.writeText(text);

const ObjToURLQuery = <T,>(obj: T) => {
  return Object.keys(obj)
    .map((key) => {
      try {
        let valueType = typeof obj[key] as string;
        switch (valueType) {
          case 'number':
            valueType = 'n';
            break;
          case 'boolean':
            valueType = 'b';
            break;
          case 'string':
            valueType = 's';
            break;
          default:
            // throw new Error(
            //   `Unknown Type Found : typeof(value) => ${valueType} | value => ${obj[key]}`,
            // );
            return -1;
        }
        return `${valueType}${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`;
      } catch (err) {
        return -1;
      }
    })
    .filter((val) => val !== -1)
    .join('&');
};

export const URLQueryToObj = (URL: ParsedUrlQuery) => {
  type AllowedValueTypes = number | boolean | string;
  const constructedObject = Object.keys(URL).reduce((prev, key) => {
    try {
      const settingName = key.substring(1);
      const valueType = key[0];
      let val = URL[key] as AllowedValueTypes;

      switch (valueType) {
        case 'n':
          val = Number(val);
          break;
        case 'b':
          val = Boolean(val);
          break;
        case 's':
          val = String(val);
          break;
        default:
          throw new Error('Unknown Type of value');
      }

      // eslint-disable-next-line no-param-reassign
      prev[settingName] = val;
    } catch (err) {
      // console.log(err);
    }

    return prev;
  }, {});

  return constructedObject;
};

export const getSrcURL = (formSettings: DisplayFormSettings, formSlug: string) => {
  const URL = `${window.location.origin}/embed/forms/${formSlug}`;
  const QueryString = ObjToURLQuery(formSettings);

  if (!QueryString.length) return URL;

  return `${URL}?${QueryString}`;
};

interface GetEmbedLinkProps {
  IFrameTagConfig?: {
    width?: number;
    height?: number;
  };
  /** Embedded Form Settings */
  FormSettings: DisplayFormSettings;
  formSlug: string;
  filterSettings?: boolean;
}

export const getFilteredFormSettings = (FormSettings: GetEmbedLinkProps['FormSettings']) => {
  const Settings: GetEmbedLinkProps['FormSettings'] = {};
  if (FormSettings.widgetType === 'both') return FormSettings;

  let allowedProps: string[] = [];

  if (FormSettings.widgetType === 'form') {
    allowedProps = allowedProps.concat([
      'formView',
      'whoCanSubmit',
      'canSubmitOnlyOneResponse',
      'editResponse',
      'showFormTitle',
    ]);

    if (FormSettings.whoCanSubmit === 'authUser') {
      allowedProps = allowedProps.concat(['viewAuthRequired']);
    }

    if (FormSettings.formView === 'selectItem') {
      allowedProps = allowedProps.concat(['selectItemField']);
    } else if (FormSettings.formView === 'button') {
      allowedProps = allowedProps.concat(['buttonLabel']);
    } else if (FormSettings.formView === 'leaderboard') {
      allowedProps = allowedProps.concat(['minValue', 'maxValue']);
    }
  } else if (FormSettings.widgetType === 'responses') {
    allowedProps = allowedProps.concat([
      'responsesView',
      'whoCanViewResponses',
      'onlyMyResponses',
      'showFormTitle',
    ]);
  }

  allowedProps.forEach((key) => {
    Settings[key] = FormSettings[key];
  });

  return Settings;
};

export const getEmbedLink = (config: GetEmbedLinkProps) => {
  const { IFrameTagConfig: IFrameConfig, FormSettings, formSlug, filterSettings } = config;
  let settings = FormSettings;

  if (filterSettings) settings = getFilteredFormSettings(FormSettings);

  const link = getSrcURL(settings, formSlug);

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
  value: string | boolean;
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
