import { MarkerType } from 'react-flow-renderer';

export const defaultNodes: any = [
  {
    id: '1',
    type: 'customNode',
    data: {
      label: 'Welcome to React Flow!',
    },
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    type: 'customNode',
    data: {
      label: 'This is a default node',
    },
    position: { x: -150, y: 150 },
  },
  {
    id: '3',
    type: 'customNode',
    data: { label: 'Sample Text' },
    position: { x: 150, y: 150 },
  },
];

export const defaultEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    label: 'edge label',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    type: 'smoothstep',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];
