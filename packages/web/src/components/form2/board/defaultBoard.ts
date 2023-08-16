import { generateObjectId } from '@frontend/shared/utils/objectId';
import { IBoard, IBoardItem, IBoardColumns } from './boardType';

const defaultItems: IBoardItem[] = [
  {
    _id: generateObjectId(),
    title: 'First task',
    description: 'Task description...',
    backgroundColor: '#FCFE7D',
  },
];

const defaultColumns: IBoardColumns = {
  [generateObjectId()]: {
    title: 'To do',
    backgroundColor: '#D3D3D3',
    items: defaultItems,
  },
  [generateObjectId()]: {
    title: 'Done',
    items: [],
    backgroundColor: '#D3D3D3',
  },
};

export const defaultBoard: IBoard = {
  _id: generateObjectId(),
  title: 'Board',
  columns: defaultColumns,
};
