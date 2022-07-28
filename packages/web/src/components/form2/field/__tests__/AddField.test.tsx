/* eslint-disable import/first */
/* eslint-disable dot-notation */
/* eslint-disable no-await-in-loop */
/* eslint-disable react/jsx-props-no-spreading */

// NOT WORKING, TODO: FIX
// jest.mock('../../SelectForm', () => ({
//   __esModule: true,
//   default: jest.fn(SelectFormMock),
// }));

// jest.mock('../../SelectFormFields', () => ({
//   __esModule: true,
//   default: jest.fn(SelectFormFieldsMock),
// }));

import { IField } from '@frontend/shared/types/form';
import userEvent from '@testing-library/user-event';
import _ from 'lodash';
import { defaultOptions } from '@frontend/shared/hooks/form/addFields';
import SelectFormMock, { SelectFormMockData } from '../__mocks__/SelectForm';
import SelectFormFieldsMock, { SelectFormFieldsMockData } from '../__mocks__/SelectFormFields';
import { render, within, screen, waitFor, prettyDOM, logDOM } from '../../../../../jest/test-utils';
import AddField from '../AddField';

const FIELD_TYPES = [
  {
    label: 'Form',
    value: 'form',
  },
  {
    label: 'Form Response',
    value: 'response',
  },
  {
    label: 'Text',
    value: 'text',
  },
  {
    label: 'Number',
    value: 'number',
  },
  {
    label: 'Password',
    value: 'password',
  },
  {
    label: 'Textarea',
    value: 'textarea',
  },
  {
    label: 'Rich Textarea',
    value: 'richTextarea',
  },
  {
    label: 'Boolean',
    value: 'boolean',
  },
  {
    label: 'Email',
    value: 'email',
  },
  {
    label: 'Phone Number',
    value: 'phoneNumber',
  },
  {
    label: 'Date',
    value: 'date',
  },
  {
    label: 'Date & Time',
    value: 'dateTime',
  },
  {
    label: 'Image',
    value: 'image',
  },
  {
    label: 'File',
    value: 'file',
  },
  {
    label: 'Address',
    value: 'address',
  },
  {
    label: 'Static Text',
    value: 'label',
  },
  {
    label: 'Link',
    value: 'link',
  },
  {
    label: 'Color Picker',
    value: 'colorPicker',
  },
  {
    label: 'Barcode Scanner',
    value: 'barcodeScanner',
  },
  {
    label: 'Lighthouse Report',
    value: 'lighthouseReport',
  },
  {
    label: 'Board',
    value: 'board',
  },
  {
    label: 'Diagram',
    value: 'diagram',
  },
  {
    label: 'Flow Diagram',
    value: 'flowDiagram',
  },
  {
    label: 'Condition',
    value: 'condition',
  },
] as const;

const TODO = [
  {
    label: 'Two way relationship',
    name: 'twoWayRelationship',
    testid: 'two-way-relationship-field-option',
  },
  {
    label: 'Dependent relationship',
    name: 'dependentRelationship',
    testid: 'dependent-relationship-field-option',
  },
  {
    // fieldType === response then label = 'Select Item (Independent relation)'
    label: 'Select Item',
    name: 'selectItem',
    testid: 'select-item-field-option',
  },
  {
    label: 'Can create new option',
    name: 'selectAllowCreate',
    testid: 'select-allow-create-field-option',
  },
  {
    label: 'Created by user',
    name: 'showOptionCreatedByUser',
    testid: 'show-option-created-by-user-field-option',
  },
  {
    label: 'Created on template',
    name: 'showOptionCreatedOnTemplate',
    testid: 'show-option-created-on-template-field-option',
  },
  {
    label: 'Show as checkbox',
    name: 'showAsCheckbox',
    testid: 'show-as-checkbox-field-option',
  },
] as const;

const COMMON_FIELD_ATTRIBUTES = [
  {
    label: 'Required',
    testid: 'required-field-field-option',
    // name is the <Checkbox name='$name'/> attribute
    name: 'required',
  },
  {
    label: 'Multiple values',
    testid: 'multiple-value-field-option',
    name: 'multipleValues',
  },
  {
    label: 'Unique',
    testid: 'unique-field-option',
    name: 'unique',
  },
  {
    label: 'Show comment box',
    testid: 'show-comment-box-field-option',
    name: 'showCommentBox',
  },
  {
    label: 'Show star rating',
    testid: 'show-star-rating-field-option',
    name: 'showStarRating',
  },
  {
    label: 'Response not editable',
    testid: 'response-not-editable-field-option',
    name: 'notEditable',
  },
  {
    label: 'System calculated & saved',
    testid: 'sys-calcAndsaved-field-option',
    name: 'systemCalculatedAndSaved',
  },
  {
    label: 'System calculated & view',
    testid: 'sys-calAndview-field-option',
    name: 'systemCalculatedAndView',
  },
] as const;

const TOTAL_FIELD_OPTIONS = [...COMMON_FIELD_ATTRIBUTES, ...TODO];

type TFieldTypeLabels = typeof FIELD_TYPES[number]['label'];
type TFieldTypeValues = typeof FIELD_TYPES[number]['value'];

const getFieldTypeValue = (fieldType: TFieldTypeLabels) => {
  const _FieldType = FIELD_TYPES.find((field) => field.label === fieldType);
  if (!_FieldType) throw new Error(`Field Type : ${fieldType} not found (404)`);
  return _FieldType.value;
};

interface IExtendedField extends IField {
  fieldType: TFieldTypeValues;
}

interface IFormValues extends IField {
  isWidget: boolean;
}

type AppFieldProps = Parameters<typeof AddField>[0] & {
  field: IExtendedField;
  onSave: jest.Mock<IFormValues>;
};

const getAppFieldMockProps = (extra?: Partial<AppFieldProps>): AppFieldProps => {
  return {
    field: null,
    onSave: jest.fn(),
    onCancel: jest.fn(),
    ...extra,
  };
};

const getFieldLabelComponent = () => screen.getByTestId('field-label');

const getFieldLabelInpElement = (labelComponent: HTMLElement = null) => {
  let _labelComp = labelComponent;
  if (!labelComponent) _labelComp = getFieldLabelComponent();
  return _labelComp.querySelector('input[name=label]') as HTMLInputElement;
};

const getFieldTypeComponent = () => screen.getByTestId('field-type-select');

/**
 * Gives the Input HTML Element
 * which has the current selected field type value eg: @type {TExtendedFieldTypes}
 * */
const getFieldTypeInpEle = (SelectComponent: HTMLElement = null) => {
  let _SC = SelectComponent;

  if (!_SC) {
    _SC = getFieldTypeComponent();
  }

  return _SC.querySelector('input[name=fieldType]') as HTMLButtonElement;
};

/**
 * @returns selected FieldType Option
 */
const selectFieldType = async (
  fieldType: TFieldTypeLabels,
  SelectComponent: HTMLElement = null,
) => {
  let _SC = SelectComponent;

  if (!_SC) _SC = getFieldTypeComponent();

  const user = userEvent.setup();
  const MenuOpenBtn = within(_SC).getByRole('button', { hidden: true });
  const isMenuAlreadyVisible = MenuOpenBtn.getAttribute('aria-expanded') === 'true';

  if (!isMenuAlreadyVisible) await user.click(MenuOpenBtn);

  const Menu = within(document.getElementById('fieldType-menu')).getByRole('listbox');
  const FieldTypeOption = within(Menu).getByText(fieldType);

  await user.click(FieldTypeOption);

  if (isMenuAlreadyVisible) await user.click(MenuOpenBtn);

  return FieldTypeOption;
};

const getFormSaveBtn = () => {
  return screen.getByTestId('form-save-btn');
};

describe('Selecting Form Field Type (label : Field Type*)', () => {
  // ---------FUNCTIONS START------------------- // HELPER FUNCTIONS
  const getSelectedValue = async (SelectComponent: HTMLElement = null) => {
    let _SC = SelectComponent;
    if (!_SC) _SC = getFieldTypeComponent();

    const MenuOpenBtn = within(_SC).getByRole('button', { hidden: true });

    if (MenuOpenBtn.getAttribute('aria-expanded') === 'false') {
      const user = userEvent.setup();
      await user.click(MenuOpenBtn);
    }

    const Menu = within(document.getElementById('fieldType-menu')).getByRole('listbox');

    const selectedFieldType = within(Menu).getByRole('option', { selected: true });
    return selectedFieldType.getAttribute('data-value');
  };

  // ---------FUNCTIONS END-------------------

  // ---------TEST CASES START-------------
  test('should be in the DOM', () => {
    render(<AddField {...getAppFieldMockProps()} />);

    const SelectComponent = getFieldTypeComponent();
    expect(SelectComponent).toBeInTheDocument();

    const InputLabel = getFieldTypeInpEle(SelectComponent);
    expect(InputLabel).toBeInTheDocument();
  });

  test('to be Visible to the user', () => {
    render(<AddField {...getAppFieldMockProps()} />);
    const SelectComponent = getFieldTypeComponent();
    expect(SelectComponent).toBeVisible();
  });

  test(`should be Enabled`, () => {
    render(<AddField {...getAppFieldMockProps()} />);
    const inputElement = getFieldTypeInpEle();
    expect(inputElement).toBeEnabled();
  });

  test('Label Name should be = `Field Type*`', () => {
    const { getByTestId } = render(<AddField {...getAppFieldMockProps()} />);
    const InputLabel = getByTestId('field-type-label');
    expect(InputLabel).toHaveTextContent('Field Type*');
  });

  test('should be Focusable on click', async () => {
    const { getByTestId } = render(<AddField {...getAppFieldMockProps()} />);

    const SelectComponent = getByTestId('field-type-select');

    const user = userEvent.setup();
    await user.click(SelectComponent);

    const ClickableBtn = within(SelectComponent).getByRole('button');
    expect(ClickableBtn).toHaveFocus();
  });

  test(`should have labelId prop on (MUI <Select/>)`, async () => {
    const { getByTestId } = render(<AddField {...getAppFieldMockProps()} />);
    const SelectComponent = getByTestId('field-type-select');
    const ClickableBtn = within(SelectComponent).getByRole('button');
    expect(ClickableBtn).not.toHaveAttribute('aria-labelledby', null);
  });

  test('should not have any default value selected', async () => {
    render(<AddField {...getAppFieldMockProps()} />);

    const SelectComponent = getFieldTypeComponent();
    const MenuOpenBtn = within(SelectComponent).getByRole('button', { hidden: true });

    if (MenuOpenBtn.getAttribute('aria-expanded') === 'false') {
      const user = userEvent.setup();
      await user.click(MenuOpenBtn);
    }

    const Menu = within(document.getElementById('fieldType-menu')).getByRole('listbox');
    const selectedFieldType = within(Menu).queryByRole('option', { selected: true });
    expect(selectedFieldType).toBeFalsy();
  });

  test('should have 24 types of fields', async () => {
    render(<AddField {...getAppFieldMockProps()} />);

    const SelectComponent = getFieldTypeComponent();
    const MenuOpenBtn = within(SelectComponent).getByRole('button', { hidden: true });

    if (MenuOpenBtn.getAttribute('aria-expanded') === 'false') {
      const user = userEvent.setup();
      await user.click(MenuOpenBtn);
    }

    const Menu = within(document.getElementById('fieldType-menu')).getByRole('listbox');
    const options = within(Menu).getAllByRole('option');

    const TOTAL_OPTIONS = 24;
    expect(options).toHaveLength(TOTAL_OPTIONS);
  });

  test('is required', async () => {
    render(<AddField {...getAppFieldMockProps()} />);

    const FieldTypeInpEle = getFieldTypeInpEle();
    const FormSaveBtn = getFormSaveBtn();

    const user = userEvent.setup();

    // default input should be removed
    // eslint-disable-next-line no-console
    console.warn(
      'AddField.test.tsx',
      'doesnt clear the selected field type, so if default field Type is provided then this test will 100% fail',
    );
    await user.clear(FieldTypeInpEle);

    await user.click(FormSaveBtn);

    const FieldTypeComp = getFieldTypeComponent();
    const FieldTypeBtn = within(FieldTypeComp).getByRole('button');

    // debugger;
    await waitFor(() => expect(FieldTypeBtn).toHaveAccessibleDescription('Field Type is required'));
  });

  describe('Field Type Options', () => {
    test.each(FIELD_TYPES)(
      `Option of '$label' should be present with value of '$value' and it should be selectable`,
      async (field) => {
        render(<AddField {...getAppFieldMockProps()} />);

        const FieldTypeSelectComponent = getFieldTypeComponent();
        const MenuOpenBtn = within(FieldTypeSelectComponent).getByRole('button', { hidden: true });
        const user = userEvent.setup();

        if (MenuOpenBtn.getAttribute('aria-expanded') === 'false') {
          await user.click(MenuOpenBtn);
        }
        const Menu = within(document.getElementById('fieldType-menu')).getByRole('listbox');

        const optionElement = within(Menu).getByText(field.label);
        expect(optionElement).toHaveAttribute('data-value', field.value);

        // checking indirectly, dont use
        // expect(optionElement).toHaveAttribute('data-value', optionData.value);

        await user.click(optionElement);

        const selectedvalue = await getSelectedValue(FieldTypeSelectComponent);
        expect(selectedvalue).toBe(field.value);
      },
    );
  });

  // ---------TEST CASES END-------------
});

describe('Field Options / Attributes', () => {
  const TEST_FIELD_OPTION = {
    Required: () => {
      const OptionEle = screen.getByTestId('required-field-field-option');
      const nameAttr = 'required';
      const label = 'Required';
      const innerCheckBox = OptionEle.querySelector('input');

      expect(OptionEle).toBeVisible();
      expect(innerCheckBox).toBeEnabled();
      expect(innerCheckBox).toHaveAttribute('name', nameAttr);
      expect(within(OptionEle).queryByText(label)).not.toBeFalsy();
      expect(innerCheckBox).not.toBeChecked();
    },

    'Multiple values': () => {
      const OptionEle = screen.getByTestId('multiple-value-field-option');
      const nameAttr = 'multipleValues';
      const label = 'Multiple values';
      const innerCheckBox = OptionEle.querySelector('input');

      expect(OptionEle).toBeVisible();
      expect(innerCheckBox).toBeEnabled();
      expect(innerCheckBox).toHaveAttribute('name', nameAttr);
      expect(within(OptionEle).queryByText(label)).not.toBeFalsy();
      expect(innerCheckBox).not.toBeChecked();
    },

    Unique: () => {
      const OptionEle = screen.getByTestId('unique-field-option');
      const nameAttr = 'unique';
      const label = 'Unique';
      const innerCheckBox = OptionEle.querySelector('input');

      expect(OptionEle).toBeVisible();
      expect(innerCheckBox).toBeEnabled();
      expect(innerCheckBox).toHaveAttribute('name', nameAttr);
      expect(within(OptionEle).queryByText(label)).not.toBeFalsy();
      expect(innerCheckBox).not.toBeChecked();
    },

    'Show comment box': () => {
      const OptionEle = screen.getByTestId('show-comment-box-field-option');
      const nameAttr = 'showCommentBox';
      const label = 'Show comment box';
      const innerCheckBox = OptionEle.querySelector('input');

      expect(OptionEle).toBeVisible();
      expect(innerCheckBox).toBeEnabled();
      expect(innerCheckBox).toHaveAttribute('name', nameAttr);
      expect(within(OptionEle).queryByText(label)).not.toBeFalsy();
      expect(innerCheckBox).not.toBeChecked();
    },

    'Show star rating': () => {
      const OptionEle = screen.getByTestId('show-star-rating-field-option');
      const nameAttr = 'showStarRating';
      const label = 'Show star rating';
      const innerCheckBox = OptionEle.querySelector('input');

      expect(OptionEle).toBeVisible();
      expect(innerCheckBox).toBeEnabled();
      expect(innerCheckBox).toHaveAttribute('name', nameAttr);
      expect(within(OptionEle).queryByText(label)).not.toBeFalsy();
      expect(innerCheckBox).not.toBeChecked();
    },

    'Response not editable': () => {
      const OptionEle = screen.getByTestId('response-not-editable-field-option');
      const nameAttr = 'notEditable';
      const label = 'Response not editable';
      const innerCheckBox = OptionEle.querySelector('input');

      expect(OptionEle).toBeVisible();
      expect(innerCheckBox).toBeEnabled();
      expect(innerCheckBox).toHaveAttribute('name', nameAttr);
      expect(within(OptionEle).queryByText(label)).not.toBeFalsy();
      expect(innerCheckBox).not.toBeChecked();
    },

    'System calculated & saved': () => {
      const OptionEle = screen.getByTestId('sys-calcAndsaved-field-option');
      const nameAttr = 'systemCalculatedAndSaved';
      const label = 'System calculated & saved';
      const innerCheckBox = OptionEle.querySelector('input');

      expect(OptionEle).toBeVisible();
      expect(innerCheckBox).toBeEnabled();
      expect(innerCheckBox).toHaveAttribute('name', nameAttr);
      expect(within(OptionEle).queryByText(label)).not.toBeFalsy();
      expect(innerCheckBox).not.toBeChecked();
    },

    'System calculated & view': () => {
      const OptionEle = screen.getByTestId('sys-calAndview-field-option');
      const nameAttr = 'systemCalculatedAndView';
      const label = 'System calculated & view';
      const innerCheckBox = OptionEle.querySelector('input');

      expect(OptionEle).toBeVisible();
      expect(innerCheckBox).toBeEnabled();
      expect(innerCheckBox).toHaveAttribute('name', nameAttr);
      expect(within(OptionEle).queryByText(label)).not.toBeFalsy();
      expect(innerCheckBox).not.toBeChecked();
    },
  } as const;

  describe('when Field Type is not selected (default options to show)', () => {
    test.each([
      'Required',
      'Multiple values',
      'Unique',
      'Show comment box',
      'Show star rating',
      'Response not editable',
      'System calculated & saved',
      'System calculated & view',
    ])(`checking '%s' Field Option`, async (fieldOption) => {
      render(<AddField {...getAppFieldMockProps()} />);
      TEST_FIELD_OPTION[fieldOption]();
    });
  });

  describe(`for Field Type = 'Form'`, () => {
    test.each([
      'Required',
      'Multiple values',
      'Unique',
      'Show comment box',
      'Show star rating',
      'Response not editable',
      'System calculated & saved',
      'System calculated & view',
    ])(`checking '%s' Field Option`, async (fieldOption) => {
      render(<AddField {...getAppFieldMockProps()} />);
      await selectFieldType('Form');
      TEST_FIELD_OPTION[fieldOption]();
    });
  });

  describe(`for Field Type = 'Form Response'`, () => {
    test.each([
      'Required',
      'Multiple values',
      'Unique',
      'Show comment box',
      'Show star rating',
      'Response not editable',
      'System calculated & saved',
      'System calculated & view',
    ])(`checking '%s' Field Option`, async (fieldOption) => {
      render(<AddField {...getAppFieldMockProps()} />);
      await selectFieldType('Form Response');
      TEST_FIELD_OPTION[fieldOption]();
    });
  });
});

describe("Field's Label Name (label : Label*)", () => {
  // ---------TEST CASES START-------------
  test('to be in the DOM', () => {
    render(<AddField {...getAppFieldMockProps()} />);
    const labelComponent = getFieldLabelComponent();
    expect(labelComponent).toBeInTheDocument();
  });

  test('to be visible', () => {
    render(<AddField {...getAppFieldMockProps()} />);
    const labelComponent = getFieldLabelComponent();
    expect(labelComponent).toBeVisible();
  });

  test('to be Enabled', () => {
    render(<AddField {...getAppFieldMockProps()} />);
    const innerInput = getFieldLabelInpElement();
    expect(innerInput).toBeEnabled();
  });

  test(`should have Input Components's Label Name as Label*`, () => {
    render(<AddField {...getAppFieldMockProps()} />);
    const labelComponent = getFieldLabelComponent().querySelector('label');
    expect(labelComponent).toHaveTextContent('Label*');
  });

  test('should have appropriate attributes', () => {
    render(<AddField {...getAppFieldMockProps()} />);
    const innerInput = getFieldLabelInpElement();
    expect(innerInput).toHaveAttribute('type', 'text');
    expect(innerInput).toHaveAttribute('name', 'label');
  });

  test('should be auto focusable & blurable on click', async () => {
    const { getByTestId } = render(
      <>
        <AddField {...getAppFieldMockProps()} />
        <input type="text" data-testid="diff-inp" />
      </>,
    );
    const innerInput = getFieldLabelInpElement();
    expect(innerInput).toHaveFocus();

    const user = userEvent.setup();

    // SIMULATING CLIKING SOMEWHERE ELSE
    await user.click(getByTestId('diff-inp'));

    expect(innerInput).not.toHaveFocus();
  });

  test(`should have a default value = ''`, () => {
    render(<AddField {...getAppFieldMockProps()} />);
    const innerInput = getFieldLabelInpElement();
    const DEFAULT_VALUE = '';
    expect(innerInput).toHaveValue(DEFAULT_VALUE);
  });

  // not working, saveBtn is the form submit button, which is not working
  test('is required', async () => {
    render(<AddField {...getAppFieldMockProps()} />);

    const labelNameInputEle = getFieldLabelInpElement();
    const FormSaveBtn = getFormSaveBtn();

    const user = userEvent.setup();

    // default input should be removed
    await user.clear(labelNameInputEle);

    await user.click(FormSaveBtn);

    await waitFor(() => expect(labelNameInputEle).toHaveAccessibleDescription('Label is required'));
  });

  test('(important) should be able to enter a label name', async () => {
    render(<AddField {...getAppFieldMockProps()} />);

    const labelComponent = getFieldLabelComponent();
    const innerInput = getFieldLabelInpElement(labelComponent);
    const user = userEvent.setup();

    await user.click(labelComponent);

    // CLEAR DEFAULT INPUT
    // await act(() => user.clear(innerInput)); // gives issues
    await user.clear(innerInput);

    // TODO: add more kinds of test cases for better validation!
    const TEST_INPUTS = [
      {
        type: 'label',
        expect: 'label',
      },
      {
        type: 'LABEL',
        expect: 'LABEL',
      },
      {
        type: 'Label123',
        expect: 'Label123',
      },
      {
        type: '!@#',
        expect: '!@#',
      },
    ];

    for (let i = 0; i < TEST_INPUTS.length; i += 1) {
      const test = TEST_INPUTS[Number(i)];

      expect(innerInput).toHaveValue('');
      await user.type(innerInput, test.type);
      expect(innerInput).toHaveValue(test.expect);
      await user.clear(innerInput);
    }
  });

  // ---------TEST CASES END-------------
});

describe('Form Save Button', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface

  interface RequiredFields {
    FIELD_LABEL: string;
    FIELD_TYPE: {
      label: TFieldTypeLabels;
      value: TFieldTypeValues;
    };
    OnSubmitFormData: IFormValues;
  }

  /**
   * Enters minimum required fields to submit the form. \
   * required fields are :-
   *  - `Field Label`
   *  - `Field Type`
   */
  const enterRequiredFields = async (extra: Partial<RequiredFields> = {}) => {
    const FieldLabelInpEle = getFieldLabelInpElement();

    const user = userEvent.setup();
    const FIELD_LABEL = extra?.FIELD_LABEL || 'MockLabel';
    const FIELD_TYPE_LABEL = extra?.FIELD_TYPE?.label || 'Boolean';

    await user.type(FieldLabelInpEle, FIELD_LABEL);

    await selectFieldType(FIELD_TYPE_LABEL);

    // TODO
    // const UPDATED = {
    //   form: SelectFormMockData,
    //   options: {
    //     formField: SelectFormFieldsMockData.fieldID,
    //   },
    // };

    const RETURN_DATA: RequiredFields = {
      FIELD_LABEL,
      FIELD_TYPE: {
        label: FIELD_TYPE_LABEL,
        value: getFieldTypeValue(FIELD_TYPE_LABEL),
      },
      OnSubmitFormData: {
        _id: expect.any(String),
        fieldType: getFieldTypeValue(FIELD_TYPE_LABEL),
        // TODO
        // form: SelectFormMockData,
        form: null,
        isWidget: false,
        label: FIELD_LABEL,
        template: null,
        options: _.merge(defaultOptions, {}),
      },
    };

    return _.merge(RETURN_DATA, extra) as RequiredFields;
  };

  function getSubmitConfig(
    mockProps: ReturnType<typeof getAppFieldMockProps>,
    mockInput: Awaited<ReturnType<typeof enterRequiredFields>>,
  ): IFormValues {
    const updatedData: Partial<typeof mockInput['OnSubmitFormData']> = {
      _id: expect.any(String),
      fieldType: mockInput.FIELD_TYPE.value,
      isWidget: Boolean(mockProps.isWidget),
      label: mockInput.FIELD_LABEL,
    };

    return _.merge(mockInput.OnSubmitFormData, updatedData);
  }

  test('is enabled', () => {
    render(<AddField {...getAppFieldMockProps()} />);

    const FormSaveBtn = getFormSaveBtn();

    // console.debug('enabled', prettyDOM(FormSaveBtn));

    expect(FormSaveBtn).toBeEnabled();
  });

  test('to be visible', () => {
    render(<AddField {...getAppFieldMockProps()} />);
    const FormSaveBtn = getFormSaveBtn();
    expect(FormSaveBtn).toBeVisible();
  });

  describe('form should be submitted', () => {
    test('with minimum required fields', async () => {
      const mockProps = getAppFieldMockProps();
      render(<AddField isWidget={false} {...mockProps} />);

      await enterRequiredFields();
      const FormSaveBtn = getFormSaveBtn();
      const user = userEvent.setup();

      await user.click(FormSaveBtn);
      expect(mockProps.onSave).toHaveBeenCalledTimes(1);
    });

    describe('with form data', () => {
      // TODO: work in progress
      describe.skip('field type', () => {
        test.only.each(FIELD_TYPES)(`having '$label' selected as Type of Field`, async (field) => {
          const mockProps = getAppFieldMockProps({
            isWidget: false,
          });

          render(<AddField {...mockProps} />);

          const mockInput = await enterRequiredFields({
            FIELD_TYPE: field,
          });

          const FormSaveBtn = getFormSaveBtn();
          const user = userEvent.setup();
          await user.click(FormSaveBtn);

          const onSaveMock = mockProps.onSave.mock;
          const ExpectedFieldConfig: IFormValues = getSubmitConfig(mockProps, mockInput);
          const ExpectedActionType = 'create';
          const ExpectedOnSaveArguments = [ExpectedFieldConfig, ExpectedActionType];

          // WHY mocking a react component isn't working?
          // const ele1 = screen.queryByTestId('select-form-mock');
          // const ele = screen.queryByTestId('select-form-fields-mock');
          // logDOM(document);
          // debugger;
          // console.log(onSaveMock.calls[0], Boolean(ele1), Boolean(ele));
          // debugger;
          expect(onSaveMock.calls[0]).toEqual(ExpectedOnSaveArguments);
        });
      });

      describe('Field Options / Attributes', () => {
        test.each(COMMON_FIELD_ATTRIBUTES)(
          `having '$label' Attribute of a field selected`,
          async (attr) => {
            const mockProps = getAppFieldMockProps({
              isWidget: false,
            });

            const { getByTestId } = render(<AddField {...mockProps} />);

            const user = userEvent.setup();
            const mockInput = await enterRequiredFields();
            const AttrCheckBox = getByTestId(attr.testid).querySelector('input');
            const FormSaveBtn = getFormSaveBtn();

            await user.click(AttrCheckBox);
            await user.click(FormSaveBtn);

            const onSaveMock = mockProps.onSave.mock;

            mockInput.OnSubmitFormData.options[attr.name] = true;
            const ExpectedOnSubmitData = mockInput.OnSubmitFormData;
            const ExpectedActionType = 'create';
            const ExpectedOnSaveArguments = [ExpectedOnSubmitData, ExpectedActionType];

            expect(onSaveMock.calls[0]).toEqual(ExpectedOnSaveArguments);
          },
          10000,
        );
      });
    });
  });
  // test('form should be submitted', async () => {
  //   const mockProps = getAppFieldMockProps();
  //   render(<AddField {...mockProps} />);

  //   const FieldNameInpEle = getFieldLabelInpElement();
  //   await selectFieldType();
  //   const user = userEvent.setup();

  //   await user.clear(LabelNameInpEle);
  //   await new Promise((r) => setTimeout(r, 1000));
  //   expect(mockProps.onSave).toHaveBeenCalledTimes(0);
  // });

  describe('form should not be submitted', () => {
    test('if field label is empty', async () => {
      const mockProps = getAppFieldMockProps();
      render(<AddField {...mockProps} />);

      await enterRequiredFields();

      const FieldLabelInpEle = getFieldLabelInpElement();
      const FormSaveBtn = getFormSaveBtn();
      const user = userEvent.setup();

      await user.clear(FieldLabelInpEle);
      await user.click(FormSaveBtn);
      await waitFor(() => expect(FieldLabelInpEle).toHaveAccessibleDescription());

      expect(mockProps.onSave).toHaveBeenCalledTimes(0);
    });

    test('if field type is empty', async () => {
      const mockProps = getAppFieldMockProps();
      render(<AddField {...mockProps} />);

      const FormSaveBtn = getFormSaveBtn();
      const FieldTypeComp = getFieldTypeComponent();
      const FieldTypeBtn = within(FieldTypeComp).getByRole('button');
      const user = userEvent.setup();

      // eslint-disable-next-line no-console
      console.warn(
        'AddField.test.tsx',
        'doesnt clear the selected field type, so if default field Type is provided then this test will 100% fail',
      );
      // const FieldTypeInpEle = getFieldTypeInpEle();
      // await enterRequiredFields();
      // await user.clear(FieldTypeInpEle);

      await user.click(FormSaveBtn);
      await waitFor(() => expect(FieldTypeBtn).toHaveAccessibleDescription());

      expect(mockProps.onSave).toHaveBeenCalledTimes(0);
    });
  });
});
