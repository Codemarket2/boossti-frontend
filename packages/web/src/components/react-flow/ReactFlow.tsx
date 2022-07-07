import Edit from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import FlowEditor, { IFlow } from './FlowEditor';

interface ReactFlowProps {
  flow: IFlow;
  onFlowChange?: (flow: IFlow) => void;
  editMode?: boolean;
}

export default function ReactFlow({ flow, onFlowChange, editMode }: ReactFlowProps) {
  const [editor, setEditor] = useState(false);
  return (
    <div>
      <Button
        size="small"
        startIcon={editMode && <Edit />}
        variant="contained"
        onClick={() => setEditor(!editor)}
      >
        {editMode ? 'Edit' : 'View'} Flow Diagram
      </Button>
      {editor && (
        <FlowEditor
          overlay
          editMode={editMode}
          open={editor}
          onClose={() => setEditor(false)}
          flow={flow}
          onFlowChange={(newFlow) => {
            if (editMode) onFlowChange(newFlow);
          }}
        />
      )}
    </div>
  );
}
