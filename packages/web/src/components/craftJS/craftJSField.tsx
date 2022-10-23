import { useState } from 'react';

// MUI
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

// WEB
import CraftJSEditor from './craftJSEditor';

interface CraftJSFieldProp {
  onChange?: Parameters<typeof CraftJSEditor>[0]['onChange'];
}

const CraftJSField = ({ onChange }: CraftJSFieldProp) => {
  const [showEditor, setShowEditor] = useState(false);

  if (showEditor)
    return (
      <CraftJSEditor
        onChange={onChange}
        onClose={() => setShowEditor(false)}
        showEditor={showEditor}
      />
    );

  return (
    <>
      <Button
        size="small"
        startIcon={<EditIcon />}
        variant="contained"
        onClick={() => setShowEditor(true)}
      >
        Edit React Page
      </Button>
    </>
  );
};

export default CraftJSField;
