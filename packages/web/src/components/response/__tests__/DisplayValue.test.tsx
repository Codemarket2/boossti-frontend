import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen, act, waitFor } from '../../../../jest/test-utils';
import DisplayValue from '../../form2/DisplayValue';

const initialprops = {
  field: {
    fieldType: 'email',
    form: null,
    label: 'email',
    options: {
      caseInsensitiveUnique: false,
      default: false,
      formField: '',
      multipleValues: false,
      notEditable: false,
      physicalQuantity: '',
      required: true,
      selectAllowCreate: false,
      selectItem: false,
      selectOptions: [''],
      showAsCheckbox: false,
      showCommentBox: false,
      showOptionCreatedByUser: false,
      showOptionCreatedOnTemplate: false,
      showStarRating: false,
      staticText: '',
      systemCalculatedAndSaved: false,
      systemCalculatedAndView: false,
      systemValue: null,
      unique: false,
      unit: '',
    },
  },
  value: { value: 'arjavsethi07@gmail.com' },
  imageAvatar: true,
  verticalView: true,
  _id: '62b0cf932b8e64fb467cfffc',
  template: null,
};

const DisplayValueTest = () => {
  const [props, setprops] = useState(initialprops);
  return (
    <>
      <DisplayValue
        field={props.field}
        value={props.value}
        imageAvatar={props.imageAvatar}
        verticalView={props.verticalView}
      />
    </>
  );
};

describe('checks the working of switch case', () => {
  it('checks email rendering', () => {
    render(<DisplayValueTest />);
    const email = screen.getByTestId('text-output');
    expect(email).toBeInTheDocument();
    const value = initialprops.value.value;
    expect(email).toHaveTextContent(value);
  });

  initialprops.field.fieldType = 'text';
  initialprops.value.value = 'arjavsethi';
  it('checks text rendering', () => {
    render(<DisplayValueTest />);
    const text = screen.getByTestId('text-output');
    expect(text).toBeInTheDocument();
    const value = initialprops.value.value;
    expect(text).toHaveTextContent(value);
  });

  initialprops.field.fieldType = 'textarea';
  initialprops.value.value = 'arjavsethislebgfdkjdlesvfljusvfousvcykzjaushcvouseyf';
  it('checks text area rendering', () => {
    render(<DisplayValueTest />);
    const textArea = screen.getByTestId('text-output');
    expect(textArea).toBeInTheDocument();
    const value = initialprops.value.value;
    expect(textArea).toHaveTextContent(value);
  });

  initialprops.field.fieldType = 'url';
  initialprops.value.value = 'https://www.google.com';
  it('checks text area rendering', () => {
    render(<DisplayValueTest />);
    const url = screen.getByTestId('text-output');
    expect(url).toBeInTheDocument();
    const value = initialprops.value.value;
    expect(url).toHaveTextContent(value);
  });

  initialprops.field.fieldType = 'password';
  initialprops.value.value = 'arjavsethi';
  it('checks password rendering', () => {
    render(<DisplayValueTest />);
    const password = screen.getByTestId('text-output');
    expect(password).toBeInTheDocument();
    const value = initialprops.value.value;
    expect(password).toHaveTextContent(value);
  });

  initialprops.field.fieldType = 'number';
  initialprops.value.value = '12345';
  it('checks number rendering', () => {
    render(<DisplayValueTest />);
    const number = screen.getByTestId('number-output');
    expect(number).toBeInTheDocument();
    const value = initialprops.value.value;
    expect(number).toHaveTextContent(value);
  });

  initialprops.field.fieldType = 'date';
  initialprops.value.value = '2020-01-01';
  it('checks date rendering', () => {
    render(<DisplayValueTest />);
    const date = screen.getByTestId('date-output');
    expect(date).toBeInTheDocument();
    const value = initialprops.value.value;
    expect(date).toHaveTextContent(value);
  });
});
