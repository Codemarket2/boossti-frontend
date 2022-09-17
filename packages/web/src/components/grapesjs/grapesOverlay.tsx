import Button from '@mui/material/Button';
import Edit from '@mui/icons-material/Edit';
import { useState } from 'react';
import parse from 'html-react-parser';
import Grapesjs from '../../../pages/grapesjs';
import Overlay from '../common/Overlay';
import GrapesjsEditor from './GrapesjsEditor';
import EditMode from '../common/EditMode';

interface Iprops {
  value?: string;
  onChange?: (value: string) => void;
  editMode?: boolean;
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
        <>
          <Overlay
            open={open}
            onClose={() => {
              setopen(false);
            }}
            title={editMode ? 'Editing Html Page' : 'Viewing Html Page'}
            maxWidth="100vw"
            minWidth="100vw"
            hideAppBar={editMode}
          >
            {editMode ? (
              <GrapesjsEditor
                value={value}
                onChange={(html) => {
                  onChange(html);
                  setopen(false);
                }}
              />
            ) : (
              <div>{parse(value)}</div>
            )}
          </Overlay>
        </>
      )}
    </>
  );
}
