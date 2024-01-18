import { useState } from 'react';

// MUI
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

// CRAFTJS - WEB
import CraftJSEditor, { CraftJSEditorProps } from './craftJSEditor';

interface CraftJSFieldProp {
  onChange?: Parameters<typeof CraftJSEditor>[0]['onChange'];
  EncodedPageContent?: CraftJSEditorProps['EncodedPageContent'];
}

const CraftJSField = ({ onChange, EncodedPageContent }: CraftJSFieldProp) => {
  const [showEditor, setShowEditor] = useState(false);

  if (showEditor)
    return (
      <CraftJSEditor
        EncodedPageContent={EncodedPageContent}
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
