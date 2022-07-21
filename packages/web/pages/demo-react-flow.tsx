import React, { useState } from 'react';
import ReactFlow from '../src/components/react-flow/ReactFlow';

export default function ReactFlowPage() {
  const [flow, onFlowChange] = useState(null);

  return <ReactFlow _id="1" editMode flow={flow} onFlowChange={onFlowChange} />;
}
