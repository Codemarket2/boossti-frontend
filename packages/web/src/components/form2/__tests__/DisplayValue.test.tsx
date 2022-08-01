import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import moment from 'moment';
import crypto from 'crypto';
import { fireEvent, render, screen, act, waitFor } from '../../../../jest/test-utils';
import DisplayValue from '../DisplayValue';
import { defaultOptions } from '../../../../../shared/hooks/form/addFields';
import DisplayBoard from '../board/DisplayBoard';
import DisplayDiagram from '../../syncfusion-diagram/DisplayDiagram';
import Diagram from './diagramProp';
import ReactFlow from '../../react-flow/ReactFlow';
import flowDiagramProps from './flowDiagramProps';
import 'next/router';
import DisplayFieldCondition from '../field-condition/DisplayFieldCondition';

const flowDiagram = flowDiagramProps();
const diagram = Diagram();

Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: (arr) => crypto.randomBytes(arr.length),
  },
});

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
      _id: '62e57e0ad6436ef4a1b0e15a',
      value: 'arjavsethi07@gmail.com',
      valueDate: '',
      valueNumber: '124',
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
        diagram: { ...diagram },
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
    },
    imageAvatar: true,
    verticalView: false,
    _id: '62b0cf932b8e64fb467cfffc',
    template: null,
  };
};

jest.mock('next/router', () => ({
  useRouter: () => {
    return {
      route: '/',
      pathname: '',
      query: {},
      asPath: '',
      push: jest.fn(() => Promise.resolve(true)),
    };
  },
}));

const DisplayFieldConditionTest = (props) => {
  return <DisplayFieldCondition conditions={props.value.options.condition} />;
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
const DisplayBoardTest = (props): any => {
  return (
    <>
      <DisplayBoard board={props.value.options.board} verticalView={props.verticalView} />
    </>
  );
};
const DisplayDiagramTest = (props): any => {
  return (
    <>
      <DisplayDiagram diagram={props.value.options.diagram} />
    </>
  );
};
const ReactFlowTest = (props): any => {
  return (
    <>
      <ReactFlow _id={props.value._id} flow={props.value.options.flowDiagram} />
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
    const {valueNumber} = props.value;
    expect(number).toHaveTextContent(valueNumber);
  });
  it('checks phone number rendering', () => {
    const props = getInitialProps();
    props.field.fieldType = 'number';
    props.value.valueNumber = '12345';
    render(<DisplayValueTest {...props} />);
    const number = screen.getByTestId('number-output');
    expect(number).toBeInTheDocument();
    const {valueNumber} = props.value;
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
  it('checks address rendering', () => {
    const props = getInitialProps();
    props.field.fieldType = 'address';
    props.value.value = '123+xyz+Indore+MadhyaPradesh+India';
    render(<DisplayValueTest {...props} />);
    const address = screen.getByTestId('address-output');
    expect(address).toBeInTheDocument();
    const value = 'Address: 123,Landmark: xyz,City: Indore,State: MadhyaPradesh,Country: India';
    expect(address).toHaveTextContent(value);
  });
  it('check display board rendering', () => {
    const props = getInitialProps();
    props.field.fieldType = 'displayBoard';

    render(<DisplayBoardTest {...props} />);
    const displayBoard = screen.getByTestId('displayBoard-output');
    expect(displayBoard).toBeInTheDocument();
    const button = screen.getByTestId('displayBoard-output-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Show Board');
    fireEvent.click(button);
    const board = screen.getByTestId('board');
    expect(board).toBeInTheDocument();
  });
  it('checks diagram rendering', () => {
    const props = getInitialProps();
    props.field.fieldType = 'diagram';

    render(<DisplayDiagramTest {...props} />);
    const diagram = screen.getByTestId('diagram-output');
    expect(diagram).toBeInTheDocument();
    const buttonDiagram = screen.getByTestId('button-diagram');
    expect(buttonDiagram).toBeInTheDocument();
    expect(buttonDiagram).toHaveTextContent('Display Diagram');
    fireEvent.click(buttonDiagram);
    const Overlay = screen.getByTestId('overlay');
    expect(Overlay).toBeInTheDocument();
  });
    it('checks display diplay Field condition rendering', () => {
      const props = getInitialProps();
      props.field.fieldType = 'displayFieldCondition';

      render(<DisplayFieldConditionTest {...props} />);
      const displayFieldCondition = screen.getByTestId('displayFieldCondition-output');
      expect(displayFieldCondition).toBeInTheDocument();
    });
  it('checks react flow rendering', () => {
    const props = getInitialProps();
    props.field.fieldType = 'reactFlow';

    render(<ReactFlowTest {...props} />);

    const reactFlow = screen.getByTestId('reactFlow-output');
    expect(reactFlow).toBeInTheDocument();
    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('View Flow Diagram');
    fireEvent.click(button);
  });

});
