/**
 * Diagram Default sample
 */
// Initializes the nodes for the diagram
export const nodes = [
  {
    id: 'NewIdea',
    height: 60,
    offsetX: 300,
    offsetY: 80,
    shape: { type: 'Flow', shape: 'Terminator' },
    annotations: [
      {
        content: 'Place Order',
      },
    ],
  },
  {
    id: 'Meeting',
    height: 60,
    offsetX: 300,
    offsetY: 160,
    shape: { type: 'Flow', shape: 'Process' },
    annotations: [
      {
        content: 'Start Transaction',
      },
    ],
  },
  {
    id: 'BoardDecision',
    height: 60,
    offsetX: 300,
    offsetY: 240,
    shape: { type: 'Flow', shape: 'Process' },
    annotations: [
      {
        content: 'Verification',
      },
    ],
  },
  {
    id: 'Project',
    height: 60,
    offsetX: 300,
    offsetY: 330,
    shape: { type: 'Flow', shape: 'Decision' },
    annotations: [
      {
        content: 'Credit card valid?',
      },
    ],
  },
  {
    id: 'End',
    height: 60,
    offsetX: 300,
    offsetY: 430,
    shape: { type: 'Flow', shape: 'Decision' },
    annotations: [
      {
        content: 'Funds available?',
      },
    ],
  },
  {
    id: 'node11',
    height: 60,
    offsetX: 545,
    offsetY: 330,
    shape: { type: 'Flow', shape: 'Process' },
    annotations: [
      {
        content: 'Enter payment method',
      },
    ],
  },
  {
    id: 'transaction_entered',
    height: 60,
    offsetX: 300,
    offsetY: 630,
    shape: { type: 'Flow', shape: 'Terminator' },
    annotations: [
      {
        content: 'Log transaction',
      },
    ],
  },
  {
    id: 'node12',
    height: 60,
    offsetX: 480,
    offsetY: 630,
    shape: { type: 'Flow', shape: 'Process' },
    annotations: [
      {
        content: 'Reconcile the entries',
      },
    ],
  },
  {
    id: 'transaction_completed',
    height: 60,
    offsetX: 300,
    offsetY: 530,
    shape: { type: 'Flow', shape: 'Process' },
    annotations: [
      {
        content: 'Complete Transaction',
      },
    ],
  },
  {
    id: 'Data',
    height: 45,
    offsetX: 110,
    offsetY: 530,
    shape: { type: 'Flow', shape: 'Data' },
    annotations: [
      {
        content: 'Send e-mail',
        margin: { left: 25, right: 25 },
      },
    ],
  },
  {
    id: 'node10',
    height: 70,
    offsetX: 475,
    offsetY: 530,
    shape: { type: 'Flow', shape: 'DirectData' },
    annotations: [{ content: 'Customer Database', margin: { left: 25, right: 25 } }],
  },
];

// Initializes the connector for the diagram
export const connectors = [
  {
    id: 'connector1',
    sourceID: 'NewIdea',
    targetID: 'Meeting',
  },
  { id: 'connector2', sourceID: 'Meeting', targetID: 'BoardDecision' },
  { id: 'connector3', sourceID: 'BoardDecision', targetID: 'Project' },
  {
    id: 'connector4',
    sourceID: 'Project',
    annotations: [{ content: 'Yes', style: { fill: 'white' } }],
    targetID: 'End',
  },
  {
    id: 'connector5',
    sourceID: 'End',
    annotations: [{ content: 'Yes', style: { fill: 'white' } }],
    targetID: 'transaction_completed',
  },
  {
    id: 'connector6',
    sourceID: 'transaction_completed',
    targetID: 'transaction_entered',
  },
  { id: 'connector7', sourceID: 'transaction_completed', targetID: 'Data' },
  { id: 'connector8', sourceID: 'transaction_completed', targetID: 'node10' },
  {
    id: 'connector9',
    sourceID: 'node11',
    targetID: 'Meeting',
    segments: [{ direction: 'Top', type: 'Orthogonal', length: 120 }],
  },
  {
    id: 'connector10',
    sourceID: 'End',
    annotations: [{ content: 'No', style: { fill: 'white' } }],
    targetID: 'node11',
    segments: [{ direction: 'Right', type: 'Orthogonal', length: 100 }],
  },
  {
    id: 'connector11',
    sourceID: 'Project',
    annotations: [{ content: 'No', style: { fill: 'white' } }],
    targetID: 'node11',
  },
  {
    id: 'connector12',
    style: { strokeDashArray: '2,2' },
    sourceID: 'transaction_entered',
    targetID: 'node12',
  },
];

// Initialize the flowShapes for the symbol palatte
export const flowShapes: any = [
  { id: 'Terminator', shape: { type: 'Flow', shape: 'Terminator' } },
  { id: 'Process', shape: { type: 'Flow', shape: 'Process' } },
  { id: 'Decision', shape: { type: 'Flow', shape: 'Decision' } },
  { id: 'Document', shape: { type: 'Flow', shape: 'Document' } },
  {
    id: 'PreDefinedProcess',
    shape: { type: 'Flow', shape: 'PreDefinedProcess' },
  },
  { id: 'PaperTap', shape: { type: 'Flow', shape: 'PaperTap' } },
  { id: 'DirectData', shape: { type: 'Flow', shape: 'DirectData' } },
  { id: 'SequentialData', shape: { type: 'Flow', shape: 'SequentialData' } },
  { id: 'Sort', shape: { type: 'Flow', shape: 'Sort' } },
  { id: 'MultiDocument', shape: { type: 'Flow', shape: 'MultiDocument' } },
  { id: 'Collate', shape: { type: 'Flow', shape: 'Collate' } },
  { id: 'SummingJunction', shape: { type: 'Flow', shape: 'SummingJunction' } },
  { id: 'Or', shape: { type: 'Flow', shape: 'Or' } },
  { id: 'InternalStorage', shape: { type: 'Flow', shape: 'InternalStorage' } },
  { id: 'Extract', shape: { type: 'Flow', shape: 'Extract' } },
  { id: 'ManualOperation', shape: { type: 'Flow', shape: 'ManualOperation' } },
  { id: 'Merge', shape: { type: 'Flow', shape: 'Merge' } },
  {
    id: 'OffPageReference',
    shape: { type: 'Flow', shape: 'OffPageReference' },
  },
  {
    id: 'SequentialAccessStorage',
    shape: { type: 'Flow', shape: 'SequentialAccessStorage' },
  },
  { id: 'Annotation', shape: { type: 'Flow', shape: 'Annotation' } },
  { id: 'Annotation2', shape: { type: 'Flow', shape: 'Annotation2' } },
  { id: 'Data', shape: { type: 'Flow', shape: 'Data' } },
  { id: 'Card', shape: { type: 'Flow', shape: 'Card' } },
  { id: 'Delay', shape: { type: 'Flow', shape: 'Delay' } },
];

// Initializes connector symbols for the symbol palette
export const connectorSymbols = [
  {
    id: 'Link1',
    type: 'Orthogonal',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } },
    style: { strokeWidth: 1, strokeColor: '#757575' },
  },
  {
    id: 'link3',
    type: 'Orthogonal',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    style: { strokeWidth: 1, strokeColor: '#757575' },
    targetDecorator: { shape: 'None' },
  },
  {
    id: 'Link21',
    type: 'Straight',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } },
    style: { strokeWidth: 1, strokeColor: '#757575' },
  },
  {
    id: 'link23',
    type: 'Straight',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    style: { strokeWidth: 1, strokeColor: '#757575' },
    targetDecorator: { shape: 'None' },
  },
  {
    id: 'link33',
    type: 'Bezier',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    style: { strokeWidth: 1, strokeColor: '#757575' },
    targetDecorator: { shape: 'None' },
  },
];

const interval = [
  1,
  9,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
];

export const gridlines = {
  lineColor: '#e0e0e0',
  lineIntervals: interval,
};
