import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import StyleDrawer from '../../style/StyleDrawer';

describe('StyleDrawer', () => {
  const mockStyles = {
    color: '#ff0000',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'serif',
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 5,
  };

  const defaultProps = {
    open: true,
    onClose: jest.fn(),
    styles: mockStyles,
    onStylesChange: jest.fn(),
  };

  it('renders without crashing', () => {
    render(<StyleDrawer {...defaultProps} />);
  });

  it('calls onClose when close button is clicked', () => {
    render(<StyleDrawer {...defaultProps} />);
    const closeButton = screen.getByTestId('close-button', { name: /close/i }) as HTMLButtonElement;
    fireEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('updates color when color input is changed', () => {
    const mockOnStylesChange = jest.fn();
    const mockHandleClose = jest.fn();

    const { rerender } = render(
      <StyleDrawer
        open
        onClose={mockHandleClose}
        styles={{}}
        onStylesChange={mockOnStylesChange}
      />,
    );

    // Find the color input using its type
    const colorInput = screen.getByTestId('text-color') as HTMLInputElement;

    // Mock the event object for a color change
    const colorChangeEvent = {
      target: { value: '#ff0000' }, // Change the color value
    };

    // Simulate a change event on the color input using the colorChangeEvent object
    fireEvent.input(colorInput, colorChangeEvent);

    // Verify that the onStylesChange function has been called with the updated color
    expect(mockOnStylesChange).toHaveBeenCalledWith({ color: colorChangeEvent.target.value });
  });

  it('updates font size when input value is changed', () => {
    const mockOnStylesChange = jest.fn();
    const mockHandleClose = jest.fn();

    const { rerender } = render(
      <StyleDrawer
        open
        onClose={mockHandleClose}
        styles={{}}
        onStylesChange={mockOnStylesChange}
      />,
    );

    // Find the font size input using its label
    const fontSizeInput = screen.getByLabelText('Font Size') as HTMLInputElement;

    // Mock the event object for a font size change
    const fontSizeChangeEvent = {
      target: { value: '20' }, // Change the font size value
    };

    // Simulate a change event on the font size input using the fontSizeChangeEvent object
    fireEvent.change(fontSizeInput, fontSizeChangeEvent);

    // Verify that the onStylesChange function has been called with the updated font size
    expect(mockOnStylesChange).toHaveBeenCalledWith({ fontSize: 20 });
  });

  it('updates font family when select value is changed', () => {
    const mockOnStylesChange = jest.fn();
    const mockHandleClose = jest.fn();

    render(
      <StyleDrawer
        open
        onClose={mockHandleClose}
        styles={{}}
        onStylesChange={mockOnStylesChange}
      />,
    );

    const selectFontFamily = screen.getByTestId('font-family');

    // Open the Select component's popup
    const button = within(selectFontFamily).getByRole('button');
    fireEvent.mouseDown(button);
    const listbox = within(screen.getByRole('presentation')).getByRole('listbox');
    const options = within(listbox).getAllByRole('option');
    const optionValues = options.map((li) => li.getAttribute('data-value'));

    expect(optionValues).toEqual(['systemDefault', 'serif', 'sans-serif']);

    fireEvent.click(options[1]);
    expect(mockOnStylesChange).toHaveBeenCalledWith({ fontFamily: 'serif' });

    // Select an option by text (case insensitive)
    // fireEvent.change(selectFontFamily, { target: { value: "sans-serif" } });
    // (expect(selectFontFamily).toHaveValue('sans-serif'));

    // Verify that the onStylesChange function has been called with the updated font family
    // expect(mockOnStylesChange).toHaveBeenCalledWith({ fontFamily: 'sans-serif' });
  });

  it('updates background color when color input is changed', () => {
    const mockOnStylesChange = jest.fn();
    const mockHandleClose = jest.fn();

    render(
      <StyleDrawer
        open
        onClose={mockHandleClose}
        styles={{}}
        onStylesChange={mockOnStylesChange}
      />,
    );

    // Find the color input using its type
    const colorInput = screen.getByTestId('background-color') as HTMLInputElement;

    // Simulate a change event on the color input
    const newColor = '#ff0000'; // Change the color value
    fireEvent.change(colorInput, { target: { value: newColor } });

    // Verify that the onStylesChange function has been called with the updated background color
    expect(mockOnStylesChange).toHaveBeenCalledWith({ backgroundColor: newColor });
  });

  it('updates margin when margin input is changed', () => {
    const mockOnStylesChange = jest.fn();
    const mockHandleClose = jest.fn();

    render(
      <StyleDrawer
        open
        onClose={mockHandleClose}
        styles={{}}
        onStylesChange={mockOnStylesChange}
      />,
    );

    // Find the margin input using its label text
    const marginInput = screen.getByLabelText('Margin') as HTMLInputElement;

    // Simulate a change event on the margin input
    const newMargin = '20'; // Change the margin value
    fireEvent.change(marginInput, { target: { value: newMargin } });

    // Verify that the onStylesChange function has been called with the updated margin
    expect(mockOnStylesChange).toHaveBeenCalledWith({ margin: parseInt(newMargin, 10) });
  });

  it('updates padding when padding input is changed', () => {
    const mockOnStylesChange = jest.fn();
    const mockHandleClose = jest.fn();

    render(
      <StyleDrawer
        open
        onClose={mockHandleClose}
        styles={{}}
        onStylesChange={mockOnStylesChange}
      />,
    );

    // Find the padding input using its label text
    const paddingInput = screen.getByLabelText('Padding') as HTMLInputElement;

    // Simulate a change event on the padding input
    const newPadding = '10'; // Change the padding value
    fireEvent.change(paddingInput, { target: { value: newPadding } });

    // Verify that the onStylesChange function has been called with the updated padding
    expect(mockOnStylesChange).toHaveBeenCalledWith({ padding: parseInt(newPadding, 10) });
  });

  it('calls onStylesChange with an empty object when reset button is clicked', () => {
    const mockOnStylesChange = jest.fn();
    const mockHandleClose = jest.fn();

    render(
      <StyleDrawer
        open
        onClose={mockHandleClose}
        styles={{}}
        onStylesChange={mockOnStylesChange}
      />,
    );

    // Find the reset button using its icon (Refresh) as a test ID
    const resetButton = screen.getByTestId('reset-button');

    // Simulate a click event on the reset button
    fireEvent.click(resetButton);

    // Verify that the onStylesChange function has been called with an empty object
    expect(mockOnStylesChange).toHaveBeenCalledWith({});
  });
});
