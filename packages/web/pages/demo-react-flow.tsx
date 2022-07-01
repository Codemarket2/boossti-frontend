import React, { useEffect, useState } from 'react';
import FlowEditor from '../src/components/react-flow/FlowEditor';

export default function ReactFlowPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return <div style={{ height: '100vh' }}>{!loading && <FlowEditor />}</div>;
}
