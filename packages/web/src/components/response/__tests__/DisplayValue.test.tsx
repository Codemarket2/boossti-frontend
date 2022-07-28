import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen, act, waitFor } from '../../../../jest/test-utils';
import DisplayValue from '../../form2/DisplayValue';
import { defaultOptions } from '../../../../../shared/hooks/form/addFields';
import moment from 'moment';
// const initialprops = {
//   field: {
//     fieldType: 'email',
//     form: null,
//     label: 'email',
//     options: {
//       ...defaultOptions,
//     },
//   },
//   value: { value: 'arjavsethi07@gmail.com' },
//   imageAvatar: true,
//   verticalView: true,
//   _id: '62b0cf932b8e64fb467cfffc',
//   template: null,
// };
const getInitialProps = () => {
  return {
    field: {
      fieldType: 'email',
      form: null,
      label: 'email',
      options: {
        ...defaultOptions,
      },
    },
    value: {
      value: 'arjavsethi07@gmail.com',
      valueDate: '',
      valueNumber: '124',
      valueBoolean: true,
    },
    imageAvatar: true,
    verticalView: true,
    _id: '62b0cf932b8e64fb467cfffc',
    template: null,
  };
};
const DisplayValueTest = (props): any => {
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
    const props = getInitialProps();
    render(<DisplayValueTest {...props} />);
    const email = screen.getByTestId('text-output');
    expect(email).toBeInTheDocument();
    const { value } = props.value;
    expect(email).toHaveTextContent(value);
  });

  it('checks text rendering', () => {
    const props = getInitialProps();
    props.field.fieldType = 'text';
    props.value.value = 'arjavsethi';
    render(<DisplayValueTest {...props} />);
    const text = screen.getByTestId('text-output');
    expect(text).toBeInTheDocument();
    const { value } = props.value;
    expect(text).toHaveTextContent(value);
  });

  it('checks text area rendering', () => {
    const props = getInitialProps();
    props.field.fieldType = 'textarea';
    props.value.value = 'arjavsethislebgfdkjdlesvfljusvfousvcykzjaushcvouseyf';
    render(<DisplayValueTest {...props} />);
    const textArea = screen.getByTestId('text-output');
    expect(textArea).toBeInTheDocument();
    const { value } = props.value;
    expect(textArea).toHaveTextContent(value);
  });

  it('checks text area rendering', () => {
    const props = getInitialProps();
    props.field.fieldType = 'url';
    props.value.value = 'https://www.google.com';
    render(<DisplayValueTest {...props} />);
    const url = screen.getByTestId('text-output');
    expect(url).toBeInTheDocument();
    const { value } = props.value;
    expect(url).toHaveTextContent(value);
  });

  it('checks password rendering', () => {
    const props = getInitialProps();
    props.field.fieldType = 'password';
    props.value.value = 'arjavsethi';
    render(<DisplayValueTest {...props} />);
    const password = screen.getByTestId('text-output');
    expect(password).toBeInTheDocument();
    const { value } = props.value;
    expect(password).toHaveTextContent(value);
  });

  it('checks number rendering', () => {
    const props = getInitialProps();
    props.field.fieldType = 'number';
    props.value.valueNumber = '12345';
    render(<DisplayValueTest {...props} />);
    const number = screen.getByTestId('number-output');
    expect(number).toBeInTheDocument();
    const valueNumber = props.value.valueNumber;
    expect(number).toHaveTextContent(valueNumber);
  });
  it('checks phone number rendering', () => {
    const props = getInitialProps();
    props.field.fieldType = 'number';
    props.value.valueNumber = '12345';
    render(<DisplayValueTest {...props} />);
    const number = screen.getByTestId('number-output');
    expect(number).toBeInTheDocument();
    const valueNumber = props.value.valueNumber;
    expect(number).toHaveTextContent(valueNumber);
  });
  it('checks date rendering', () => {
    const props = getInitialProps();
    props.field.fieldType = 'date';
    props.value.valueDate = 'June29,2022';
    render(<DisplayValueTest {...props} />);
    const date = screen.getByTestId('date-output');
    expect(date).toBeInTheDocument();
    const { valueDate } = props.value;
    const formattedDate = moment(valueDate).format('L');
    expect(date).toHaveTextContent(formattedDate);
  });
  it('checks datetime rendering', () => {
    const props = getInitialProps();
    props.field.fieldType = 'dateTime';
    props.value.valueDate = 'June29,2022';
    render(<DisplayValueTest {...props} />);
    const date = screen.getByTestId('datetime-output');
    expect(date).toBeInTheDocument();
    const { valueDate } = props.value;
    const formattedDate = moment(valueDate).format('lll');
    expect(date).toHaveTextContent(formattedDate);
  });
  it('checks boolean -for true rendering', () => {
    const props = getInitialProps();
    props.field.fieldType = 'boolean';
    props.value.valueBoolean = true;
    render(<DisplayValueTest {...props} />);
    const boolean = screen.getByTestId('boolean-output');
    expect(boolean).toBeInTheDocument();
    expect(boolean).toHaveTextContent('Yes');
  });
  it('checks boolean -for false rendering', () => {
    const props = getInitialProps();
    props.field.fieldType = 'boolean';
    props.value.valueBoolean = false;
    render(<DisplayValueTest {...props} />);
    const boolean = screen.getByTestId('boolean-output');
    expect(boolean).toBeInTheDocument();
    expect(boolean).toHaveTextContent('No');
  });
});
