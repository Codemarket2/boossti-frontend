import { DisplayForm, IDisplayFormProps } from '../DisplayForm';
import { fireEvent, render, screen, act, waitFor, getByTestId } from '../../../../jest/test-utils';

const getInitialProps = () => {
  return {
    _id: '62e57e0ad6436ef4a1b0e15a',
    slug: '',
  };
};

const DisplayFormTest = ({ slug, _id }: IDisplayFormProps) => {
  return <DisplayForm slug={slug} _id={_id} />;
};

describe('checks rendering of Display Form', () => {
  it('checks rendering of form Page', () => {
    const props = getInitialProps();
    delete props._id;
    render(<DisplayFormTest {...props} />);
    const FormPage = screen.getByTestId('FormPage');
    expect(FormPage).toBeInTheDocument();
  });
  it('checks rendering of Form Page By Id', () => {
    const props = getInitialProps();

    render(<DisplayFormTest {...props} />);
    const FormPageId = screen.getByTestId('FormPageById');
    expect(FormPageId).toBeInTheDocument();
  });
});
