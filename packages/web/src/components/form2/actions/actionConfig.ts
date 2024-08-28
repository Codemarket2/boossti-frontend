import {
  FormActionElementTypeEnum,
  FormActionTriggerTypeEnum,
} from '@frontend/shared/types/formActions';

export const formActionTriggerTypes = [
  {
    label: 'On Create',
    value: FormActionTriggerTypeEnum.OnCreate,
  },
  {
    label: 'On Update',
    value: FormActionTriggerTypeEnum.OnUpdate,
  },
  {
    label: 'On Delete',
    value: FormActionTriggerTypeEnum.OnDelete,
  },
  {
    label: 'On View',
    value: FormActionTriggerTypeEnum.OnView,
  },
  {
    label: 'Add Element on Response',
    value: FormActionTriggerTypeEnum.AddElementOnResponse,
  },
];

export const formActionElementTypes = [
  {
    label: 'Button',
    value: FormActionElementTypeEnum.Button,
  },
  // {
  //   label: 'Text',
  //   value: FormActionElementTypeEnum.Text,
  // },
];
