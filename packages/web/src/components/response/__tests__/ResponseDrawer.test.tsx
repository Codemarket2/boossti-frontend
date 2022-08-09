import { fireEvent, render, screen, act, waitFor } from '../../../../jest/test-utils';
import ResponseDrawer, { ShowResponseLabel } from '../ResponseDrawer';

const getInitialProps = () => {
  return {
    open: false,
    onClose: () => {},
    responseId: '62f28fc897f7ea743d9049c0',
  };
};
const getInitialProps2 = () => {
  return {
    response: {
      __typename: 'Response',
      _id: '62f28fc897f7ea743d9049c0',
      values: [
        {
          __typename: 'Value',
          field: '62f28ed25966185d0e8a9bee',
          value: 'asdad',
          valueNumber: null,
        },
      ],
    },
    formField: '62f28ed25966185d0e8a9bee',
  };
};
interface IProps {
  open: boolean;
  onClose: () => void;
  responseId: string;
}
interface IProps2 {
  formField: string;
  response: any;
}
const ResponseDrawerTest = ({ open, onClose, responseId }: IProps) => {
  return <ResponseDrawer open={open} onClose={onClose} responseId={responseId} />;
};
const ShowResponseLabelTest = ({ formField, response }: IProps2) => {
  return <ShowResponseLabel formField={formField} response={response} />;
};

describe('ResponseDrawer', () => {
  it('checks rendering of overlay', () => {
    const props = getInitialProps();
    props.open = true;
    render(<ResponseDrawerTest {...props} />);
    const overlay = screen.getByTestId('overlay');
    expect(overlay).toBeDefined();
  });
  it('checks rendering of show Response label', () => {
    const props = getInitialProps2();
    render(<ShowResponseLabelTest {...props} />);
    const button = screen.getByTestId('button');
    expect(button).toBeDefined();
    fireEvent.click(button);
    const overlay = screen.getByTestId('overlay');
    expect(overlay).toBeDefined();
  });
});
