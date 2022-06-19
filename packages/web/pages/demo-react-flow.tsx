import React, { useEffect, useState } from 'react';
import ReactFlow from '../src/components/react-flow/ReactFlow';

export default function ReactFlowPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return <div style={{ height: '100vh' }}>{!loading && <ReactFlow />}</div>;
}
