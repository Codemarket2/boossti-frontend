import React from 'react';
import FormFieldRules from '../components/form2/Rules/FormFieldRules';

export default {
  title: 'FORM/FormFieldRules',
  component: FormFieldRules,
};

const Template = (args) => <FormFieldRules {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: {
    condition: 'isEqualTo',
    newState: [],
  },
};

export const Data = Template.bind({});
Data.args = {
  fields: [
    {
      _id: '6259be8e9f11fbc8c6fc0865',
      label: 'Manifest Number',
      fieldType: 'number',
      options: {
        multipleValues: false,
        required: true,
        formField: '',
        default: true,
        showStarRating: true,
        showCommentBox: true,
        unique: true,
        selectOptions: [''],
        optionsTemplate: '',
      },
      template: null,
      form: null,
      __typename: 'Field2',
    },
    {
      _id: '625abb3ac0626a0b28c2392b',
      label: 'FINAL PRODUCT WEIGHT',
      fieldType: 'number',
      options: {
        multipleValues: false,
        required: true,
        formField: '',
      },
      template: null,
      form: null,
      __typename: 'Field2',
    },
    {
      _id: '625abb4481cdcd6157fc441e',
      label: 'DELIVERED',
      fieldType: 'number',
      options: {
        multipleValues: false,
        required: true,
        formField: '',
      },
      template: null,
      form: null,
      __typename: 'Field2',
    },
    {
      _id: '62614bf3f9e07b25ecab7017',
      label: 'Name',
      fieldType: 'text',
      options: {
        multipleValues: false,
        required: false,
        formField: '',
      },
      template: null,
      form: null,
      __typename: 'Field2',
    },
    {
      _id: '626283f0d8ef0d3ad10c717e',
      label: 'IN STOCK',
      fieldType: 'number',
      options: {
        multipleValues: false,
        required: false,
        formField: '',
        rules: {
          condition: 'isEqualTo',
          ruleList: [
            {
              field: '625abb3ac0626a0b28c2392b',
              operation: '',
              customValue: '',
              addMore: false,
              next: true,
            },
            {
              field: '625abb4481cdcd6157fc441e',
              operation: '',
              customValue: '',
              addMore: true,
              next: false,
            },
          ],
        },
      },
      template: null,
      form: null,
      __typename: 'Field2',
    },
    {
      _id: '62629406ba0d6a59f544df42',
      label: 'Final Value',
      fieldType: 'number',
      options: {
        multipleValues: false,
        required: false,
        formField: '',
        rules: {
          condition: 'isEqualTo',
          newState: [],
        },
      },
      template: null,
      form: null,
      __typename: 'Field2',
    },
    {
      _id: '6262fb2bb85faa7f5b4a71aa',
      label: 'total',
      fieldType: 'number',
      options: {
        multipleValues: false,
        required: false,
        formField: '',
        rules: {
          condition: 'isEqualTo',
          ruleList: [
            {
              field: '625abb4481cdcd6157fc441e',
              operation: '+',
              customValue: '',
              addMore: false,
              next: true,
            },
            {
              field: '626283f0d8ef0d3ad10c717e',
              operation: '+',
              customValue: '',
              addMore: false,
              next: true,
            },
            {
              field: 'custom',
              operation: '',
              customValue: '50',
              addMore: true,
              next: false,
            },
          ],
        },
      },
      template: null,
      form: null,
      __typename: 'Field2',
    },
  ],
  data: {
    condition: 'isEqualTo',
    ruleList: [
      {
        field: '625abb4481cdcd6157fc441e',
        operation: '+',
        customValue: '',
        addMore: false,
        next: true,
      },
      {
        field: '626283f0d8ef0d3ad10c717e',
        operation: '+',
        customValue: '',
        addMore: false,
        next: true,
      },
      {
        field: 'custom',
        operation: '',
        customValue: '50',
        addMore: true,
        next: false,
      },
    ],
  },
  activeField: {
    __typename: 'Field2',
    _id: '6262fb2bb85faa7f5b4a71aa',
    label: 'total',
    fieldType: 'number',
    options: {
      multipleValues: false,
      required: false,
      formField: '',
      rules: {
        condition: 'isEqualTo',
        ruleList: [
          {
            field: '625abb4481cdcd6157fc441e',
            operation: '+',
            customValue: '',
            addMore: false,
            next: true,
          },
          {
            field: '626283f0d8ef0d3ad10c717e',
            operation: '+',
            customValue: '',
            addMore: false,
            next: true,
          },
          {
            field: 'custom',
            operation: '',
            customValue: '50',
            addMore: true,
            next: false,
          },
        ],
      },
    },
    template: null,
    form: null,
  },
};
