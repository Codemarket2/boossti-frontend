import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Edit from '@mui/icons-material/Edit';
import { DiagramEditor } from './DiagramEditor';

interface IProps {
  value: any;
  onChange: (newValue: any) => void;
}

export default function Diagram({ value, onChange }: IProps) {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div>
      {showEditor ? (
        <Drawer anchor="right" open={showEditor}>
          <div style={{ width: '90vw' }}>
            <DiagramEditor
              editMode
              value={value}
              onSave={(newValue) => {
                setShowEditor(false);
                onChange(newValue);
              }}
            />
          </div>
        </Drawer>
      ) : (
        <Button
          size="small"
          variant="contained"
          onClick={() => setShowEditor(true)}
          startIcon={<Edit />}
        >
          Edit Diagram
        </Button>
      )}
    </div>
  );
}
