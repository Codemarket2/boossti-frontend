import { ComponentMeta } from '@storybook/react';
import Field from './Field';

export default {
  title: 'Field/FieldType',
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Field>;

// const template = () => <Field />;
const template = (args) => <Field {...args} />;
export const label = template.bind({});
label.args = {
  fieldType: 'label',
};
export const richTextarea = template.bind({});
richTextarea.args = {
  fieldType: 'richTextarea',
};
export const date = template.bind({});
date.args = {
  fieldType: 'date',
};
export const dateTime = template.bind({});
dateTime.args = {
  fieldType: 'dateTime',
};
