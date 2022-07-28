import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen, act, waitFor } from '../../../../jest/test-utils';
import DisplayValue from '../../form2/DisplayValue';
import { defaultOptions } from '../../../../../shared/hooks/form/addFields';
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
    value: { value: 'arjavsethi07@gmail.com' },
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
  const x = getInitialProps();
  it('checks email rendering', () => {
    render(<DisplayValueTest {...x} />);
    const email = screen.getByTestId('text-output');
    expect(email).toBeInTheDocument();
    const value = x.value.value;
    expect(email).toHaveTextContent(value);
  });

  x.field.fieldType = 'text';
  x.value.value = 'arjavsethi';
  it('checks text rendering', () => {
    render(<DisplayValueTest {...x} />);
    const text = screen.getByTestId('text-output');
    expect(text).toBeInTheDocument();
    const value = x.value.value;
    expect(text).toHaveTextContent(value);
  });

  x.field.fieldType = 'textarea';
  x.value.value = 'arjavsethislebgfdkjdlesvfljusvfousvcykzjaushcvouseyf';
  it('checks text area rendering', () => {
    render(<DisplayValueTest {...x} />);
    const textArea = screen.getByTestId('text-output');
    expect(textArea).toBeInTheDocument();
    const value = x.value.value;
    expect(textArea).toHaveTextContent(value);
  });

  x.field.fieldType = 'url';
  x.value.value = 'https://www.google.com';
  it('checks text area rendering', () => {
    render(<DisplayValueTest {...x} />);
    const url = screen.getByTestId('text-output');
    expect(url).toBeInTheDocument();
    const value = x.value.value;
    expect(url).toHaveTextContent(value);
  });

  x.field.fieldType = 'password';
  x.value.value = 'arjavsethi';
  it('checks password rendering', () => {
    render(<DisplayValueTest {...x} />);
    const password = screen.getByTestId('text-output');
    expect(password).toBeInTheDocument();
    const value = x.value.value;
    expect(password).toHaveTextContent(value);
  });

  // x.field.fieldType = 'number';
  // x.value.value = '12345';
  // it('checks number rendering', () => {
  //   render(<DisplayValueTest {...x} />);
  //   const number = screen.getByTestId('number-output');
  //   expect(number).toBeInTheDocument();
  //   const value = x.value.value;
  //   expect(number).toHaveTextContent(value);
  // });

  x.field.fieldType = 'date';
  x.value.value = '2020-01-01';
  it('checks date rendering', () => {
    render(<DisplayValueTest {...x} />);
    const date = screen.getByTestId('date-output');
    expect(date).toBeInTheDocument();
    const value = x.value.value;
    expect(date).toHaveTextContent(value);
  });
});
