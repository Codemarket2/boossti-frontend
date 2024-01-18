import { fireEvent, render, screen } from '../../../../jest/test-utils';
import EditNode from '../EditNode';

interface IPort {
  _id: string;
  fieldId: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  type: 'source' | 'target';
  color?: string;
  alignment?: number;
}

interface IData {
  formId: string;
  formView: string;
  label: string;
  responseId: string;
  ports: IPort[];
}

interface IProps {
  open: boolean;
  data: IData;
  onChange: (newDate: any) => void;
  onClose: () => void;
}

const getInitialProps = (): IProps => {
  return {
    data: {
      formId: '62cf22c583977f01b4a116b5',
      formView: 'formResponse',
      label: 'Flow Diagram Text Node',
      responseId: '635f5edf19abdb7ebbe7511a',
      ports: [
        {
          fieldId: '62cf22c54c6fdd8c11f7e33d',
          position: 'left',
          type: 'target',
          _id: '635f5ab8c4691d81e6988b0f',
        },
        {
          fieldId: '62d1db3a02e0386029a21047',
          position: 'right',
          type: 'source',
          _id: '635f5ab8ac007bdd5e7f41bd',
        },
      ],
    },
    open: true,
    onChange: jest.fn(),
    onClose: jest.fn(),
  };
};

const EditNodeTest = ({ open, data, onChange, onClose }: IProps) => {
  return <EditNode open={open} data={data} onChange={onChange} onClose={onClose} />;
};

describe('Test EditNode.tsx', () => {
  it('checks for EditNode Box is present when open = true', () => {
    const props = getInitialProps();
    render(<EditNodeTest {...props} />);
    const dialogBox = screen.getByTestId('editNode_dialog');
    expect(dialogBox).toBeInTheDocument();
  });
  it('checks for number of ports rendered', () => {
    const props = getInitialProps();
    render(<EditNodeTest {...props} />);
    const ports = screen.getAllByTestId('editNode_port');
    expect(ports.length).toBe(props.data.ports.length);
  });

  describe('checks for formView consistency', () => {
    it('checks for formName', () => {
      const props = getInitialProps();
      props.data.formView = 'formName';
      render(<EditNodeTest {...props} />);
      const formViewDisplay = screen.getByText('Display form name');
      expect(formViewDisplay).toBeInTheDocument();
    });
    it('checks for fullForm', () => {
      const props = getInitialProps();
      props.data.formView = 'fullForm';
      render(<EditNodeTest {...props} />);
      const formViewDisplay = screen.getByText('Display full form');
      expect(formViewDisplay).toBeInTheDocument();
    });
    it('checks for formField', () => {
      const props = getInitialProps();
      props.data.formView = 'formField';
      render(<EditNodeTest {...props} />);
      const formViewDisplay = screen.getByText('Display form field');
      expect(formViewDisplay).toBeInTheDocument();
    });
    it('checks for formResponse', () => {
      const props = getInitialProps();
      props.data.formView = 'formResponse';
      render(<EditNodeTest {...props} />);
      const formViewDisplay = screen.getByText('Display form response');
      expect(formViewDisplay).toBeInTheDocument();
    });
  });

  it('checks the add functionality of ports', () => {
    const props = getInitialProps();
    render(<EditNodeTest {...props} />);
    const addPortButton = screen.getByTestId('editNode_addPort');
    fireEvent.click(addPortButton);
    const ports = screen.getAllByTestId('editNode_port');
    expect(ports.length).toBe(props.data.ports.length + 1);
  });

  // TODO Enable this test case when delete functionality is working in the UI
  //   it('checks the delete functionality of ports', () => {
  //     const props = getInitialProps();
  //     render(<EditNodeTest {...props} />);
  //     const addPortButton = screen.getByTestId('editNode_addPort');
  //     fireEvent.click(addPortButton);
  //     const deletePortButton = screen.getAllByTestId('editNode_deletePort');
  //     fireEvent.click(deletePortButton[2]);
  //     const ports = screen.getAllByTestId('editNode_port');
  //     expect(ports.length).toBe(props.data.ports.length);
  //   });

  //   it('checks if this file is in test or not', () => {
  //     const props = getInitialProps();
  //     render(<EditNodeTest {...props} />);
  //     const demo = screen.getByTestId('editNode_demo');
  //     expect(demo).toBeInTheDocument();
  //   });
});
