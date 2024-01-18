import { render, screen, fireEvent } from '../jest/test-utils';
import Home from '../__mocks__/Demo';

describe('Home', () => {
  it('renders a heading & caption', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    });
    expect(heading).toBeInTheDocument();
    expect(screen.getByTestId('caption')).toHaveTextContent('Frontend App');
  });

  it('renders form', () => {
    const { getByTestId } = render(<Home />);
    const nameInput = getByTestId('name-input') as HTMLInputElement;
    expect(nameInput).toBeDefined();
    const stackInput = getByTestId('stack-input') as HTMLInputElement;
    expect(stackInput).toBeDefined();
    const button = getByTestId('submit-button');
    expect(button).toBeDefined();
    expect(button).toBeDisabled();
    expect(nameInput.value).toEqual('');
    fireEvent.change(nameInput, { target: { value: 'Elon Musk' } });
    expect(stackInput.value).toEqual('');
    fireEvent.change(stackInput, { target: { value: 'Frontend' } });
    expect(button).toBeEnabled();
    fireEvent.click(button);
    expect(getByTestId('success-message')).toHaveTextContent('Thank you for submitting the form');
    expect(button).toBeDisabled();
  });
  it('counter test', () => {
    const { getByTestId } = render(<Home />);
    expect(getByTestId('counter')).toHaveTextContent('0');
    fireEvent.click(getByTestId('counter-button'));
    expect(getByTestId('counter')).toHaveTextContent('1');
    fireEvent.click(getByTestId('counter-button'));
    fireEvent.click(getByTestId('counter-button'));
    expect(getByTestId('counter')).toHaveTextContent('3');
    fireEvent.click(getByTestId('counter-button'));
    expect(getByTestId('counter')).toHaveTextContent('4');
  });
});
