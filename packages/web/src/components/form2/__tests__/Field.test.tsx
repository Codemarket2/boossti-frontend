import { useState } from 'react';
import Field, { FieldProps } from '../Field';
import { defaultOptions } from '../../../../../shared/hooks/form/addFields';
import Diagram from '../diagramProp';
import flowDiagramProps from '../flowDiagramProps';

import { fireEvent, render, screen, act, waitFor } from '../../../../jest/test-utils';
import ImagePicker2 from '../../common/ImagePicker2';
import { DisplayForm } from '../DisplayForm';

const flowDiagram = flowDiagramProps();
const diagramProps = Diagram();

const getInitialProps = () => {
  return {
    field: {
      _id: '62b0cf932b8e64fb467cfffc',
      fieldType: 'date',
      form: null,
      label: 'date',
      options: {
        ...defaultOptions,
      },
    },
    disabled: false,
    validate: false,
    value: {
      _id: '62e57e0ad6436ef4a1b0e15a',
      value: 'arjavsethi07@gmail.com',
      valueDate: null,
      valueNumber: 124,
      valueBoolean: true,
      media: [],
      options: {
        board: {
          _id: '62e41b6430b86070cd99b5f2',
          coloums: {
            e41b64065f6fb3892aa15262: {
              title: 'to do',
              backgroundColor: '#D3D3D3',
              items: [
                {
                  _id: '62e41b640a2689cca23d32d0',
                  title: 'First task',
                  description: 'Task description...',
                  backgroundColor: '#FCFE7D',
                },
                {
                  _id: '62e41b640a2689cca23d32d1',
                  title: 'First task',
                  description: 'Task description...',
                  backgroundColor: '#FCFE7D',
                },
              ],
            },
          },
        },
        diagram: { ...diagramProps },
        flowDiagram: { ...flowDiagram },
        conditions: [
          {
            conditionType: '!=',
            constantValue: '',
            fieldId: '62e802064831dff3610dc75d',
            formId: '62e80208c10acc543dc73df4',
            operator: null,
            value: 'user.email',
          },
        ],
      },
      template: '',
      values: [],
      page: '',
      response: { _id: null },
      field: '',
      form: '',
    },
    onChangeValue: () => {
      return undefined;
    },
    formId: '62e57ddf0cf0f97ecde0c120',
    setUnique: false,
    responseId: '62e57e0ad6436ef4a1b0e15a',
    setUniqueLoading: () => {
      return undefined;
    },
  };
};

const FieldTest = ({
  field,
  disabled = false,
  validate,
  value,
  onChangeValue,
  formId,
  setUnique,
  responseId,
  setUniqueLoading,
}: FieldProps) => {
  return (
    <Field
      field={field}
      disabled={disabled}
      validate={validate}
      value={value}
      onChangeValue={onChangeValue}
      formId={formId}
      setUnique={setUnique}
      responseId={responseId}
      setUniqueLoading={setUniqueLoading}
    />
  );
};

describe('Test cases for Field component', () => {
  it('checks rendering of dates', () => {
    const props = getInitialProps();
    props.field.fieldType = 'date';
    render(<FieldTest {...props} />);
    const date = screen.getByTestId('date');
    expect(date).toBeInTheDocument();
    const datePicker = screen.getByTestId('date-picker');
    expect(datePicker).toBeInTheDocument();
  });
  it('checks rendering of date time', () => {
    const props = getInitialProps();
    props.field.fieldType = 'dateTime';
    render(<FieldTest {...props} />);
    const date = screen.getByTestId('date');
    expect(date).toBeInTheDocument();
    const datePicker = screen.getByTestId('date-picker');
    expect(datePicker).toBeInTheDocument();
  });
  it('checks rendering of richText area ', () => {
    const props = getInitialProps();
    props.field.fieldType = 'richTextarea';
    props.value.value = 'Arjav Sethi';
    render(<FieldTest {...props} />);
    const richText = screen.getByTestId('richTextarea');
    expect(richText).toBeInTheDocument();
    expect(richText).toHaveTextContent('Arjav Sethi');
  });
  it('checks rendering of boolean ', () => {
    const props = getInitialProps();
    props.field.fieldType = 'boolean';

    render(<FieldTest {...props} />);
    const boolean = screen.getByTestId('boolean');
    expect(boolean).toBeInTheDocument();
    const booleanCheckbox = screen.getByTestId('boolean-checkbox');
    expect(booleanCheckbox).toBeInTheDocument();
  });
  it('checks rendering of image', () => {
    const props = getInitialProps();
    props.field.fieldType = 'image';
    render(<FieldTest {...props} />);
    const image = screen.getByTestId('image');
    expect(image).toBeInTheDocument();
  });
  it('checks rendering of file', () => {
    const props = getInitialProps();
    props.field.fieldType = 'file';
    render(<FieldTest {...props} />);
    const file = screen.getByTestId('file');
    expect(file).toBeInTheDocument();
  });
  it('checks rendering of phone number', () => {
    const props = getInitialProps();
    props.field.fieldType = 'phoneNumber';
    props.value.valueNumber = 9898989898;
    render(<FieldTest {...props} />);
    const phoneNumber = screen.getByTestId('phone-input');
    expect(phoneNumber).toBeInTheDocument();
    expect(phoneNumber).toHaveTextContent('Phone'); // todo
  });

  it('checks rendering of number', () => {
    const pros = getInitialProps();
    pros.field.fieldType = 'number';
    render(<FieldTest {...pros} />);
    const number = screen.getByTestId('number');
    expect(number).toBeInTheDocument();
  });
  it('checks rendering of color picker', () => {
    const props = getInitialProps();
    props.field.fieldType = 'colorPicker';
    render(<FieldTest {...props} />);
    const color = screen.getByTestId('color-picker');
    expect(color).toBeInTheDocument();
  });
  it('checks rendeing of barcode scanner', () => {
    const props = getInitialProps();
    props.field.fieldType = 'barcodeScanner';
    render(<FieldTest {...props} />);
    const barcodeScanner = screen.getByTestId('barcode-scanner');
    expect(barcodeScanner).toBeInTheDocument();
  });
  it('checks rendering of address', () => {
    const props = getInitialProps();
    props.field.fieldType = 'address';
    render(<FieldTest {...props} />);
    const address = screen.getByTestId('addressSearch');
    expect(address).toBeInTheDocument();
  });
  it('checks rendering of lighthouse', () => {
    const props = getInitialProps();
    props.field.fieldType = 'lighthouseReport';
    render(<FieldTest {...props} />);
    const lighthouse = screen.getByTestId('lighthouse-report');
    expect(lighthouse).toBeInTheDocument();
  });
  it('checks rendering of link', () => {
    const props = getInitialProps();
    props.field.fieldType = 'link';
    render(<FieldTest {...props} />);
    const link = screen.getByTestId('link');
    expect(link).toBeInTheDocument();
  });
  it('checks rendering of response ', () => {
    const props = getInitialProps();
    props.field.fieldType = 'response';
    render(<FieldTest {...props} />);
    const response = screen.getByTestId('response');
    expect(response).toBeInTheDocument();
    const button = screen.getByTestId('response-button');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(button).toHaveTextContent('Add');
    expect(button).toBeEnabled();
    const responseModal = screen.getByTestId('responseModal');
    expect(responseModal).toBeInTheDocument();
  });
  it('checks rendering of responsebyID', () => {
    const props = getInitialProps();
    props.value.response._id = '62e57e0ad6436ef4a1b0e15a';
    props.field.fieldType = 'response';
    render(<FieldTest {...props} />);
    const responseId = screen.getByTestId('responseId');
    expect(responseId).toBeInTheDocument();
  });
  it('checks rendering of form', () => {
    const props = getInitialProps();
    props.field.fieldType = 'form';
    render(<FieldTest {...props} />);
    const form = screen.getByTestId('form');
    expect(form).toBeInTheDocument();
  });
  it('checks rendering of board', () => {
    const props = getInitialProps();
    props.field.fieldType = 'board';
    render(<FieldTest {...props} />);
    const board = screen.getByTestId('board');
    expect(board).toBeInTheDocument();
  });
  it('checks rendering of diagram', () => {
    const props = getInitialProps();
    props.field.fieldType = 'diagram';
    render(<FieldTest {...props} />);
    const diagram = screen.getByTestId('diagram');
    expect(diagram).toBeInTheDocument();
  });
  it('checks rendering of flow Diagram', () => {
    const props = getInitialProps();
    props.field.fieldType = 'flowDiagram';
    render(<FieldTest {...props} />);
    const flowDiagra = screen.getByTestId('flow-diagram');
    expect(flowDiagra).toBeInTheDocument();
  });
  it('checks rendering of condition', () => {
    const props = getInitialProps();
    props.field.fieldType = 'condition';
    render(<FieldTest {...props} />);
    const conditions = screen.getByTestId('condition');
    expect(conditions).toBeInTheDocument();
  });
});
