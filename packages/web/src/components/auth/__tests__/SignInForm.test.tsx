import { render, screen } from '@testing-library/react';
import Wrapper from '../../../../__mocks__/Wrapper';
import SignInForm from '../SignInForm';

// jest.mock('../SignInForm', () => ({
//   useDispatch: () => {
//     return () => null;
//   },
// }));

describe('Home', () => {
  it('renders a heading', () => {
    render(<SignInForm />, { wrapper: Wrapper });

    // const heading = screen.getByRole('heading');
    // fireEvent.click(screen.getByTestId('signin-button'));
    const button = screen.getByTestId('signin-button');
    expect(button).toBeEnabled();
  });
});
