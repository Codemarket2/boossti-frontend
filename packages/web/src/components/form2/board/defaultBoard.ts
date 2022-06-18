import { generateObjectId } from '@frontend/shared/utils/objectId';

const defaultItems = [
  {
    _id: generateObjectId(),
    title: 'First task',
    description: 'Task description...',
    backgroundColor: '#FCFE7D',
  },
  // {
  //   _id: generateObjectId(),
  //   title: 'Title 2',
  //   description: 'Second task',
  //   backgroundColor: '#FCFE7D',
  // },
];

const defaultColumns = {
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

export const defaultBoard = {
  _id: generateObjectId(),
  title: 'New board',
  columns: defaultColumns,
};
