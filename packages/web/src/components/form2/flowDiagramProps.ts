const flowDiagram = () => {
  return {
    nodes: [
      {
        id: '62e57dfeaca8cf81eb124eb6',
        type: 'customNode2',
        position: { x: 460.390625, y: 120 },
        data: {
          formId: '62e57ddf0cf0f97ecde0c120',
          label: 'ARJAV SETHI',
          ports: [
            { _id: '62e57dfee159b2d3e429d777', position: 'top', type: 'target' },
            { _id: '62e57dfe88831ea24ed27382', position: 'bottom', type: 'source' },
            { _id: '62e57dfe3a479052292b3228', position: 'left', type: 'target' },
            { _id: '62e57dfea7f62de1eb71ed72', position: 'right', type: 'source' },
          ],
        },
        width: 120,
        height: 39,
      },
      {
        id: '62e57e0170fee4f934b09d1a',
        type: 'customNode2',
        position: { x: 459.0859375, y: 215.75 },
        data: {
          formId: '62b03d7cba5058cb9b86c3fc',
          label: 'Account',
          ports: [
            { _id: '62e57e011dc4b004238a7e0b', position: 'top', type: 'target' },
            { _id: '62e57e013bba318653d1e4af', position: 'bottom', type: 'source' },
            { _id: '62e57e015fc97ce5b3814ac2', position: 'left', type: 'target' },
            { _id: '62e57e019b4457a779d102ff', position: 'right', type: 'source' },
          ],
        },
        width: 120,
        height: 40,
        selected: true,
        positionAbsolute: { x: 459.0859375, y: 215.75 },
        dragging: false,
      },
    ],
    edges: [
      {
        source: '62e57dfeaca8cf81eb124eb6',
        sourceHandle: '62e57dfe88831ea24ed27382',
        target: '62e57e0170fee4f934b09d1a',
        targetHandle: '62e57e011dc4b004238a7e0b',
        markerEnd: { type: 'arrowclosed', color: '#808080' },
        animated: true,
        type: 'customEdge',
        style: { stroke: '#808080' },
        id:
          'reactflow__edge-62e57dfeaca8cf81eb124eb662e57dfe88831ea24ed27382-62e57e0170fee4f934b09d1a62e57e011dc4b004238a7e0b',
      },
    ],
  };
};
export default flowDiagram;
