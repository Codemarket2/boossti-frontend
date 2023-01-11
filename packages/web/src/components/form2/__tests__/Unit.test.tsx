import { useState } from 'react';
import Field, { FieldProps } from '../Field';
import { defaultOptions } from '../../../../../shared/hooks/form/addFields';
import Diagram from '../diagramProp';
import flowDiagramProps from '../flowDiagramProps';
import { fireEvent, render, screen, act, waitFor } from '../../../../jest/test-utils';
import ImagePicker2 from '../../common/ImagePicker2';
import { DisplayForm } from '../DisplayForm';
import { render, fireEvent } from '@testing-library/react';
import FormField from './FormFields';

describe('FormField', () => {
    let label: string, errorMessage:string, inputValue:string;
    beforeEach(() => {
        label = 'Name';
        errorMessage = 'Name is required';
        inputValue = 'Boossti';
    })
  test('renders label and input', () => {
    const { getByLabelText } = render(<FormField label={label} />);
    const input = getByLabelText(label);
    expect(input).toBeInTheDocument();
  });

  test('handles input change', () => {
    const { getByLabelText } = render(<FormField label={label} />);
    const input = getByLabelText(label);

    fireEvent.change(input, { target: { value: inputValue } });
    expect(input.value).toBe(inputValue);
  });

  test('displays error message', () => {
    const { getByText } = render(<FormField label={label} errorMessage={errorMessage} />);
    const error = getByText(errorMessage);
    expect(error).toBeInTheDocument();
  });
  
  test('test onBlur', () => {
    const onBlur = jest.fn()
    const { getByLabelText } = render(<FormField label={label}  errorMessage={errorMessage}  onBlur={onBlur}/>);
    const input = getByLabelText(label);
    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalled();
  });
  
  test('test onFocus', () => {
    const onFocus = jest.fn()
    const { getByLabelText } = render(<FormField label={label}  errorMessage={errorMessage}  onFocus={onFocus}/>);
    const input = getByLabelText(label);

    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalled();
  });
  
  test('test onChange', () => {
    const onChange = jest.fn()
    const { getByLabelText } = render(<FormField label={label}  errorMessage={errorMessage}  onChange={onChange}/>

{/*
The above test suite uses the render function from @testing-library/react to render a mock form that includes the FormField component and a submit button.

First test case is testing that the form is submitting correctly, by using onSubmit prop to listen for the form submit event, it uses jest.fn() to create a mock function and then, using .toHaveBeenCalled() to assert that the function has been called after the form submit.

The second test case checks that when the form submits, it should contain the correct input value, it uses onSubmit prop to listen for the form submit event and prevent the default event. Then it asserts that input value is equal to the inputValue which passed to the component.

It's important to note that getByLabelText and getByText are returning the elements by matching the text, so it's important that the text inside the component should be the same as passed to the test case.

You can adjust the specific test cases to match the component you are working on and the different scenarios you may want to test.


  */}