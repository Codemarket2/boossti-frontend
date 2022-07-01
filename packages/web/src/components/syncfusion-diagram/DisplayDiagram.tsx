import { Button } from '@mui/material';
import React, { useState } from 'react';
import Overlay from '../common/Overlay';
import { DiagramEditor } from './DiagramEditor';

export default function DisplayDiagram({ diagram }: { diagram: any }) {
  const [showDiagram, setShowDiagram] = useState(false);
  return (
    <div>
      {showDiagram ? (
        <Overlay minWidth="80vw" open={showDiagram} onClose={() => setShowDiagram(false)}>
          <DiagramEditor value={diagram} onSave={() => setShowDiagram(false)} />
        </Overlay>
      ) : (
        <Button onClick={() => setShowDiagram(true)}>Display Diagram</Button>
      )}
    </div>
  );
}
