import moment from 'moment';
import { fireEvent, render, screen, act, waitFor, getByTestId } from '../../../../jest/test-utils';
import FormGrid from '../../../../pages/ReactGridLayout/ReactGridLayout';

// Mock necessary dependencies if needed
jest.mock('@frontend/shared/hooks/form', () => ({
  getFormBySlug: jest.fn(),
}));

describe('DragFromOutsideLayout Component', () => {
  const mockLayouts = [
    { i: '1', x: 0, y: 0, w: 2, h: 2 },
    { i: '2', x: 2, y: 0, w: 2, h: 2 },
  ];

  it('renders without crashing', () => {
    render(<FormGrid value={null} onLayoutChange={null} onChange={null} />);
  });

  // it('displays the correct number of grid items', () => {
  //   const { getAllByTestId } = render(
  //     <DragFromOutsideLayout
  //       value={mockLayouts}
  //       onLayoutChange={null}
  //       onChange={null}
  //       render={true}
  //     />,
  //   );

  //   // Replace 'grid-item' with an actual data-testid you set for your grid items
  //   const gridItems = getAllByTestId('grid-item');
  //   expect(gridItems.length).toBe(mockLayouts.length);
  // });

  // it('triggers onDrop function when a grid item is dropped', () => {
  //   const onLayoutChangeMock = jest.fn();
  //   const onChangeMock = jest.fn();
  //   const { getByTestId } = render(
  //     <DragFromOutsideLayout
  //       value={mockLayouts}
  //       onLayoutChange={onLayoutChangeMock}
  //       onChange={onChangeMock}
  //       render={false}
  //     />,
  //   );

  //   const dropArea = getByTestId('drag-area');
  //   fireEvent.dragOver(dropArea);
  //   fireEvent.drop(dropArea);

  //   expect(onLayoutChangeMock).toHaveBeenCalled();
  //   expect(onChangeMock).toHaveBeenCalled();
  // });

  // it('handles onDelete when the delete button is clicked', () => {
  //   const onLayoutChangeMock = jest.fn();
  //   const onChangeMock = jest.fn();
  //   const { getByText } = render(
  //     <DragFromOutsideLayout
  //       value={mockLayouts}
  //       onLayoutChange={onLayoutChangeMock}
  //       onChange={onChangeMock}
  //       render={false}
  //     />,
  //   );

  //   fireEvent.click(getByText('Delete'));

  //   // Expect onLayoutChangeMock and onChangeMock to be called or assert the component's behavior accordingly
  //   expect(onLayoutChangeMock).toHaveBeenCalled();
  //   expect(onChangeMock).toHaveBeenCalled();
  // });

  // Add more test cases for other functionalities such as resizing, editing styles, etc.
});
