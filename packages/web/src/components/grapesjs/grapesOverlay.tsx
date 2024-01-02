import Button from '@mui/material/Button';
import Edit from '@mui/icons-material/Edit';
import { useState } from 'react';
import parse from 'html-react-parser';
import dynamic from 'next/dynamic';
import TextField from '@mui/material/TextField';
import Grapesjs from '../../../pages/grapesjs';
import Overlay from '../common/Overlay';
// import GrapesjsEditor from './GrapesjsEditor';
import EditMode from '../common/EditMode';
import RichTextarea from '../common/RichTextarea2';

const GrapesjsEditor = dynamic(() => import('./GrapesjsEditor'), {
  ssr: false,
});
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
        {editMode ? 'Edit' : 'View'} Html Page Duh!
      </Button>
      <br />
      {editMode && (
        <>
          or
          <TextField
            multiline
            rows={16}
            fullWidth
            variant="outlined"
            name="value"
            size="small"
            onChange={({ target }) => {
              onChange(target.value);
            }}
            value={value || ''}
          />
        </>
      )}
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
