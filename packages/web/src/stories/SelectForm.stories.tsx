import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SelectForm from '../components/form2/SelectForm';
import { getFormsMock } from './getFormsMock';

export default {
  title: 'Example/SelectForm',
  component: SelectForm,
} as ComponentMeta<typeof SelectForm>;

export const Default: ComponentStory<typeof SelectForm> = (args) => <SelectForm {...args} />;

Default.parameters = {
  apolloClient: {
    mocks: getFormsMock,
  },
};
