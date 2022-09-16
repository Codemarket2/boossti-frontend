import Button from '@mui/material/Button';
import Edit from '@mui/icons-material/Edit';
import { useState } from 'react';
import Grapesjs from '../../../pages/grapesjs';
import Overlay from '../common/Overlay';
import GrapesjsEditor from './GrapesjsEditor';

interface Iprops {
  value?: string;
  onChange?: (value: Ichange) => void;
  editMode?: boolean;
}
interface Ichange {
  value: string;
}
export default function Webpage({ editMode, value, onChange }: Iprops) {
  const [open, setopen] = useState(false);
  const toggleEditor = () => {
    if (open) {
      setopen(false);
    } else {
      setopen(true);
    }
  };

  return (
    <>
      <Button
        data-testid="button"
        size="small"
        startIcon={editMode && <Edit />}
        variant="contained"
        onClick={() => {
          toggleEditor();
        }}
      >
        {editMode ? 'Edit' : 'View'} Html Page
      </Button>
      {open && (
        <Overlay
          open={open}
          onClose={() => {
            setopen(false);
          }}
          title="Edit Html Page"
          maxWidth="100vw"
          minWidth="100vw"
          hideAppBar
        >
          <GrapesjsEditor
            value={value}
            onChange={(html) => {
              onChange({ value: html });
              setopen(false);
            }}
          />
        </Overlay>
      )}
    </>
  );
}
