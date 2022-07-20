/* eslint-disable no-await-in-loop */
/* eslint-disable react/jsx-props-no-spreading */
import { IField } from '@frontend/shared/types/form';
import userEvent from '@testing-library/user-event';
import { act, render, within } from '../../../../../jest/test-utils';
import AddField from '../AddField';

type TExtendedFieldTypes =
  | 'form'
  | 'response'
  | 'text'
  | 'number'
  | 'password'
  | 'textarea'
  | 'richTextarea'
  | 'boolean'
  | 'email'
  | 'phoneNumber'
  | 'date'
  | 'dateTime'
  | 'image'
  | 'file'
  | 'address'
  | 'label'
  | 'link'
  | 'colorPicker'
  | 'barcodeScanner'
  | 'lighthouseReport'
  | 'board'
  | 'diagram'
  | 'flowDiagram'
  | 'condition';

interface IExtendedField extends IField {
  fieldType: TExtendedFieldTypes;
}

type AppFieldProps = Parameters<typeof AddField>[0] & {
  field: IExtendedField;
};

const getAppFieldMockProps = (extra?: Partial<AppFieldProps>): AppFieldProps => {
  return {
    field: null,
    onSave: jest.fn(),
    onCancel: jest.fn(),
    ...extra,
  };
};

describe('Add a Form Field Component (<AddField/>)', () => {
  describe("Field's Label (Label*)", () => {
    // HELPER FUNCTION TO AVOID BOILERPLATE
    const getInputElement = (TextField: HTMLElement) =>
      TextField.querySelector('input[name=label]') as HTMLInputElement;

    test('to be in the DOM', () => {
      const { getByTestId } = render(<AddField {...getAppFieldMockProps()} />);
      expect(getByTestId('field-label')).toBeInTheDocument();
    });

    test('to be Visible to the user', () => {
      const { getByTestId } = render(<AddField {...getAppFieldMockProps()} />);
      expect(getByTestId('field-label')).toBeVisible();
    });

    test('to be Enabled', () => {
      const { getByTestId } = render(<AddField {...getAppFieldMockProps()} />);
      const innerInput = getInputElement(getByTestId('field-label'));
      expect(innerInput).toBeEnabled();
    });

    test('should have appropriate attributes', () => {
      const { getByTestId } = render(<AddField {...getAppFieldMockProps()} />);
      const innerInput = getInputElement(getByTestId('field-label'));
      expect(innerInput).toHaveAttribute('type', 'text');
      expect(innerInput).toHaveAttribute('name', 'label');
    });

    test('should be auto focusable & blurable', () => {
      const { getByTestId } = render(
        <>
          <AddField {...getAppFieldMockProps()} />
          <input type="text" data-testid="diff-inp" />
        </>,
      );
      const innerInput = getInputElement(getByTestId('field-label'));
      expect(innerInput).toHaveFocus();

      // SIMULATING CLIKING SOMEWHERE ELSE
      getByTestId('diff-inp').focus();

      expect(innerInput).not.toHaveFocus();
    });

    test(`should have a default value = ''`, () => {
      const { getByTestId } = render(<AddField {...getAppFieldMockProps()} />);
      const innerInput = getInputElement(getByTestId('field-label'));
      const DEFAULT_VALUE = '';
      expect(innerInput).toHaveValue(DEFAULT_VALUE);
    });

    test('(important) should be able to enter label name', async () => {
      const { getByTestId } = render(<AddField {...getAppFieldMockProps()} />);

      const labelElement = getByTestId('field-label');
      const innerInput = getInputElement(labelElement);
      const user = userEvent.setup();
      user.click(labelElement);

      // CLEAR DEFAULT INPUT
      await act(() => user.clear(innerInput));

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
        await act(() => user.type(innerInput, test.type));
        expect(innerInput).toHaveValue(test.expect);
        await act(() => user.clear(innerInput));
      }
    });
  });
});
