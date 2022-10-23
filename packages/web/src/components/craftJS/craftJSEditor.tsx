import { useState } from 'react';

// MUI
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';

// OTHERS
import { Editor, Frame, Element, useEditor } from '@craftjs/core';
import lz from 'lzutf8';

// WEB
import Overlay from '../common/Overlay';
import Container from './components/Container';
import Btn from './components/Button';
import SidePanelToolBox from './SidePanelToolBox';

interface TitleBarProps {
  onClose: () => void;
  onSave?: (PageContentJSON: string) => void;
}

const TitleBar = ({ onClose, onSave }: TitleBarProps) => {
  const { query } = useEditor();

  return (
    <AppBar color="transparent" elevation={1} sx={{ width: '100%' }} position="relative">
      <Toolbar variant="dense">
        <Typography variant="h6" className="flex-grow-1">
          CraftJS Editor
        </Typography>

        <Stack direction="row">
          <Button
            className="ml-2"
            startIcon={<SaveIcon />}
            onClick={() => onSave && onSave(lz.encodeBase64(lz.compress(query.serialize())))}
            color="primary"
            variant="contained"
            size="small"
          >
            Save
          </Button>

          <Button
            className="ml-2"
            startIcon={<CloseIcon />}
            onClick={onClose}
            color="primary"
            variant="contained"
            size="small"
          >
            Close
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

interface CraftJSEditorProps {
  showEditor: boolean;
  onClose: () => void;
  onChange?: TitleBarProps['onSave'];
}

const CraftJSEditor = ({ onClose, showEditor, onChange }: CraftJSEditorProps) => {
  const [reactPageContent, setReactPageContent] = useState<string>();

  return (
    <>
      <Overlay
        open={showEditor}
        onClose={onClose}
        maxWidth="100vw"
        minWidth="100vw"
        style={{
          // display: 'flex',
          // flexFlow: 'column no-wrap',
          // backgroundColor: 'black',
          minHeight: '100%',
          maxHeight: '100%',
        }}
        hideAppBar
      >
        <Editor resolver={{ Container, Btn }}>
          <div
            style={{
              display: 'grid',
              gridTemplateRows: 'min-content auto',
              height: '100%',
            }}
          >
            <TitleBar onSave={onChange} onClose={onClose} />

            <div
              style={{
                display: 'flex',
                flexFlow: 'row nowrap',
                backgroundColor: 'gray',
              }}
            >
              <Box style={{ width: '100%' }}>
                <Frame>
                  <div style={{ display: 'flex', flexFlow: 'column nowrap', gap: '0' }}>
                    <Element is={Container} canvas>
                      <Btn text="Button 1" />
                    </Element>

                    <Element is={Container} canvas>
                      <Btn text="Button 2" />
                    </Element>
                  </div>
                </Frame>
              </Box>
              <SidePanelToolBox />
            </div>
          </div>
        </Editor>
      </Overlay>
    </>
  );
};

export default CraftJSEditor;
