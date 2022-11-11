import { render, screen, fireEvent } from '../../../../jest/test-utils';
import FlowEditor from '../FlowEditor';

interface IFlow {
  nodes: any[];
  edges: any[];
}

interface FlowEditorProps {
  open?: boolean;
  onClose?: () => void;
  flow: IFlow;
  editMode?: boolean;
  onFlowChange?: (flow: IFlow) => void;
  overlay?: boolean;
}

const getInitialProps = (): FlowEditorProps => {
  return {
    open: true,
    onClose: jest.fn(),
    flow: {
      nodes: [
        {
          id: '636e20853ec192991ed69750',
          type: 'customNode2',
          position: { x: 320, y: 138.984375 },
          data: {
            formId: '62b03d7cba5058cb9b86c3fc',
            label: 'Account',
            ports: [
              {
                _id: '636e20854c1304b9b9946ae3',
                fieldId: '62b03d7c546a4bb692291fbe',
                position: 'top',
                type: 'target',
              },
              {
                _id: '636e2085d3b65dba1f949d28',
                fieldId: '6321fb78bca29078b7043f55',
                position: 'top',
                type: 'target',
              },
              {
                _id: '636e208576df570e1c8cd340',
                fieldId: '6328d6f14b5d6d55a9ecdb8e',
                position: 'top',
                type: 'target',
              },
            ],
          },
          width: 120,
          height: 42,
        },
        {
          id: '636e2087a848df499643eb9c',
          type: 'customNode2',
          position: { x: 274.75, y: 65.7265625 },
          data: {
            formId: '63401408249486bab3d3f95a',
            label: 'Account Settings',
            ports: [
              {
                _id: '636e2087b9ea5cdccb87858a',
                fieldId: '63401408249486bab3d3f95b',
                position: 'top',
                type: 'target',
              },
            ],
          },
          width: 142,
          height: 42,
        },
      ],
      edges: [],
    },
    editMode: false,
    onFlowChange: jest.fn(),
    overlay: true,
  };
};

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const FlowEditorTest = ({
  open,
  onClose,
  flow,
  editMode,
  onFlowChange,
  overlay,
}: FlowEditorProps) => {
  return (
    <FlowEditor
      open={open}
      onClose={onClose}
      flow={flow}
      editMode={editMode}
      onFlowChange={onFlowChange}
      overlay={overlay}
    />
  );
};

describe('Test FlowEditor', () => {
  it('should render', () => {
    const props = getInitialProps();
    render(<FlowEditorTest {...props} />);
    const flowRender = screen.getByTestId('react-flow-renderer');
    expect(flowRender).toBeInTheDocument();
  });

  it('check whether editMode = true', () => {
    const props = getInitialProps();
    render(<FlowEditorTest {...props} />);
    if (props.editMode === true) {
      const editMode = screen.getAllByLabelText('editMode');
      expect(editMode).toBeInTheDocument();
    }
  });

  it('check whether length > 0', () => {
    const props = getInitialProps();
    render(<FlowEditorTest {...props} />);
    if (Node.length > 0) {
      const node = screen.getAllByLabelText('nodes');
      expect(node).toBeInTheDocument();
    }
  });

  it('check whether dndflow component is getting rendered', () => {
    const props = getInitialProps();
    render(<FlowEditorTest {...props} />);
    const dndflow = screen.getByTestId('dndflow');
    expect(dndflow).toBeInTheDocument();
  });

  it('check whether reactflow wrapper is getting rendered or not', () => {
    const props = getInitialProps();
    render(<FlowEditorTest {...props} />);
    const reacfFlowWrapper = screen.getByTestId('reactflow-wrapper');
    expect(reacfFlowWrapper).toBeInTheDocument();
  });
});
