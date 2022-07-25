/* eslint-disable no-await-in-loop */
/* eslint-disable react/jsx-props-no-spreading */
import { IField } from '@frontend/shared/types/form';
import userEvent from '@testing-library/user-event';
import { render, within, screen, waitFor } from '../../../../../jest/test-utils';
import AddField from '../AddField';

const FIELD_TYPES = [
  {
    text: 'Form',
    value: 'form',
  },
  {
    text: 'Form Response',
    value: 'response',
  },
  {
    text: 'Text',
    value: 'text',
  },
  {
    text: 'Number',
    value: 'number',
  },
  {
    text: 'Password',
    value: 'password',
  },
  {
    text: 'Textarea',
    value: 'textarea',
  },
  {
    text: 'Rich Textarea',
    value: 'richTextarea',
  },
  {
    text: 'Boolean',
    value: 'boolean',
  },
  {
    text: 'Email',
    value: 'email',
  },
  {
    text: 'Phone Number',
    value: 'phoneNumber',
  },
  {
    text: 'Date',
    value: 'date',
  },
  {
    text: 'Date & Time',
    value: 'dateTime',
  },
  {
    text: 'Image',
    value: 'image',
  },
  {
    text: 'File',
    value: 'file',
  },
  {
    text: 'Address',
    value: 'address',
  },
  {
    text: 'Static Text',
    value: 'label',
  },
  {
    text: 'Link',
    value: 'link',
  },
  {
    text: 'Color Picker',
    value: 'colorPicker',
  },
  {
    text: 'Barcode Scanner',
    value: 'barcodeScanner',
  },
  {
    text: 'Lighthouse Report',
    value: 'lighthouseReport',
  },
  {
    text: 'Board',
    value: 'board',
  },
  {
    text: 'Diagram',
    value: 'diagram',
  },
  {
    text: 'Flow Diagram',
    value: 'flowDiagram',
  },
  {
    text: 'Condition',
    value: 'condition',
  },
] as const;

type TFieldTypes = typeof FIELD_TYPES[number]['text'];
type TFieldTypeValues = typeof FIELD_TYPES[number]['value'];

const getFieldTypeValue = (fieldType: TFieldTypes) => {
  const _FieldType = FIELD_TYPES.find((field) => field.text === fieldType);
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
const selectFieldType = async (fieldType: TFieldTypes, SelectComponent: HTMLElement = null) => {
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
    await user.clear(FieldTypeInpEle);

    await user.click(FormSaveBtn);

    const FieldTypeComp = getFieldTypeComponent();
    const FieldTypeBtn = within(FieldTypeComp).getByRole('button');

    // debugger;
    await waitFor(() => expect(FieldTypeBtn).toHaveAccessibleDescription('Field Type is required'));
  });

  describe('Field Type Options', () => {
    test.each(FIELD_TYPES)(
      `Option of '$text' should be present with value of '$value' and it should be selectable`,
      async (field) => {
        render(<AddField {...getAppFieldMockProps()} />);

        const FieldTypeSelectComponent = getFieldTypeComponent();
        const MenuOpenBtn = within(FieldTypeSelectComponent).getByRole('button', { hidden: true });
        const user = userEvent.setup();

        if (MenuOpenBtn.getAttribute('aria-expanded') === 'false') {
          await user.click(MenuOpenBtn);
        }
        const Menu = within(document.getElementById('fieldType-menu')).getByRole('listbox');

        const optionElement = within(Menu).getByText(field.text);
        expect(optionElement).toHaveAttribute('data-value', field.value);

        // checking indirectly, dont use
        // expect(optionElement).toHaveAttribute('data-value', optionData.value);

        await user.click(optionElement);

        const selectedvalue = await getSelectedValue(FieldTypeSelectComponent);
        expect(selectedvalue).toBe(field.value);
      },
    );
  });

  describe('Field Attributes', () => {
    describe('common attributes', () => {
      const COMMON_ATTRIBUTES = [
        {
          text: 'Required',
          testid: 'required-field-attribute',
          // name is the <Checkbox name='$name'/> attribute
          name: 'required',
        },
        {
          text: 'Multiple values',
          testid: 'multiple-value-attribute',
          name: 'multipleValues',
        },
        {
          text: 'Unique',
          testid: 'unique-attribute',
          name: 'unique',
        },
        {
          text: 'Show comment box',
          testid: 'show-comment-box-attribute',
          name: 'showCommentBox',
        },
        {
          text: 'Show star rating',
          testid: 'show-star-rating-attribute',
          name: 'showStarRating',
        },
        {
          text: 'Response not editable',
          testid: 'response-not-editable-attribute',
          name: 'notEditable',
        },
        {
          text: 'System calculated & saved',
          testid: 'sys-calc&saved-attribute',
          name: 'systemCalculatedAndSaved',
        },
        {
          text: 'System calculated & view',
          testid: 'sys-cal&view-attribute',
          name: 'systemCalculatedAndView',
        },
      ] as const;

      test.each(COMMON_ATTRIBUTES)(`basic checks for '$text' Attribute`, (attr) => {
        const { getByTestId } = render(<AddField {...getAppFieldMockProps()} />);

        const reqAttrEle = getByTestId(attr.testid);
        // im assuming eveything is a checkbox
        const innerCheckBox = reqAttrEle.querySelector('input[type="checkbox"]');

        expect(reqAttrEle).toBeVisible();
        expect(innerCheckBox).toBeEnabled();
        expect(innerCheckBox).toHaveAttribute('name', attr.name);
      });
    });
  });

  // ---------TEST CASES END-------------
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
  /**
   * Enters minimum required fields to submit the form. \
   * required fields are :-
   *  - `Field Label`
   *  - `Field Type`
   */
  const enterRequiredFields = async () => {
    const FieldLabelInpEle = getFieldLabelInpElement();

    const user = userEvent.setup();
    const FIELD_LABEL = 'MockLabel';
    const FIELD_TYPE_LABEL: TFieldTypes = 'Boolean';

    await user.type(FieldLabelInpEle, FIELD_LABEL);

    await selectFieldType(FIELD_TYPE_LABEL);

    return {
      FIELD_LABEL,
      FIELD_TYPE: {
        label: FIELD_TYPE_LABEL,
        value: getFieldTypeValue(FIELD_TYPE_LABEL),
      },
    } as const;
  };

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

    test.skip('with appropriate onSave() callback arguments', async () => {
      const mockProps = getAppFieldMockProps({
        isWidget: false,
      });
      render(<AddField {...mockProps} />);

      const mockInput = await enterRequiredFields();

      const FormSaveBtn = getFormSaveBtn();
      const user = userEvent.setup();

      await user.click(FormSaveBtn);

      const onSaveMock = mockProps.onSave.mock;

      const ExpectedFieldConfig: IFormValues = {
        _id: expect.any(String),
        fieldType: mockInput.FIELD_TYPE.value,
        form: null,
        isWidget: Boolean(mockProps.isWidget),
        label: mockInput.FIELD_LABEL,
        template: null,
        options: {
          physicalQuantity: '',
          unit: '',
          default: false,
          selectItem: false,
          dependentRelationship: false,
          twoWayRelationship: false,
          relationLabel: '',
          relationFieldId: '',
          showOptionCreatedByUser: false,
          showOptionCreatedOnTemplate: false,
          required: false,
          multipleValues: false,
          unique: false,
          caseInsensitiveUnique: false,
          staticText: '',
          formField: '',
          showCommentBox: false,
          showStarRating: false,
          notEditable: false,
          systemCalculatedAndSaved: false,
          systemValue: null,
          systemCalculatedAndView: false,
          formula: null,
          showAsCheckbox: false,
          selectAllowCreate: false,
          selectOptions: [''],
          conditions: [],
          defaultValue: null,
        },
      };
      const ExpectedActionType = 'create';

      const ExpectedOnSaveArguments = [ExpectedFieldConfig, ExpectedActionType];

      expect(onSaveMock.calls).toEqual(ExpectedOnSaveArguments);
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

      const FieldLabalInpEle = getFieldLabelInpElement();
      const FormSaveBtn = getFormSaveBtn();
      const user = userEvent.setup();

      await user.clear(FieldLabalInpEle);
      await user.click(FormSaveBtn);
      expect(mockProps.onSave).toHaveBeenCalledTimes(0);
    });

    test('if field type is empty', async () => {
      const mockProps = getAppFieldMockProps();
      render(<AddField {...mockProps} />);

      const LabelNameInpEle = getFieldLabelInpElement();
      const user = userEvent.setup();

      await user.clear(LabelNameInpEle);
      await new Promise((r) => setTimeout(r, 1000));
      expect(mockProps.onSave).toHaveBeenCalledTimes(0);
    });
  });
});
