export const defaultNodes: any = [
  {
    id: '1',
    type: 'input',
    data: {
      label: (
        <>
          Welcome to <strong>React Flow!</strong>
        </>
      ),
    },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: {
      label: (
        <>
          This is a <strong>default node</strong>
        </>
      ),
    },
    position: { x: 100, y: 100 },
    // type: 'textUpdater',
  },
  // {
  //   id: '3',
  //   data: {
  //     label: (
  //       <>
  //         This one has a <strong>custom style</strong>
  //       </>
  //     ),
  //   },
  //   position: { x: 400, y: 100 },
  //   style: {
  //     background: '#D6D5E6',
  //     color: '#333',
  //     border: '1px solid #222138',
  //     width: 180,
  //   },
  // },
];

export const defaultEdges = [
  { id: 'e1-2', source: '1', target: '2', label: 'this is an edge label' },
  { id: 'e1-3', source: '1', target: '3' },
];
