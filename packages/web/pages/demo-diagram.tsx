import { useState } from 'react';
import { defaultDiagram } from '../src/components/syncfusion-diagram/defaultDiagram';
import Diagram from '../src/components/syncfusion-diagram/Diagram';

export default function DemoDiagram() {
  const [state, setState] = useState({ value: defaultDiagram });
  return (
    <div>
      <Diagram
        value={state.value}
        onChange={(newValue) => setState({ ...state, value: newValue })}
      />
    </div>
  );
}
