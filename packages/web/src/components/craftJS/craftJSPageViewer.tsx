import { useState, useMemo, useEffect } from 'react';

// MUI
import MaterialButton from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';

// OTHERS
import lz from 'lzutf8';
import { Editor, Frame } from '@craftjs/core';

// CRAFTJS - WEB
import { decodePageContent } from './libs/PageContent';
import Container from './components/Container';
import Button from './components/Button';
import FormDisplay from './components/Form/FormDisplay';

// WEB
import ScreenOverlay from '../common/Overlay';

interface PageContentViewerProps {
  PageContent: string;
}

const PageContentViewer = ({ PageContent }: PageContentViewerProps) => {
  const [decodedPC, setDecodedPC] = useState(decodePageContent(PageContent));

  // useEffect(() => {
  //   if(decodedPC)
  // }, []);

  if (!decodedPC) return <div>Please Wait...</div>;
  return (
    <Editor resolver={{ Container, Button, FormDisplay }} enabled={false}>
      <Frame json={decodedPC} />
    </Editor>
  );
};

type PageViewerOverlayBtnProps = PageContentViewerProps;

export const PageViewerOverlayBtn = (props: PageViewerOverlayBtnProps) => {
  const [showPage, setShowPage] = useState(false);

  if (showPage) {
    return (
      <ScreenOverlay
        open={showPage}
        onClose={() => setShowPage(false)}
        maxWidth="100vw"
        minWidth="100vw"
        title="Viewing React Page"
      >
        <PageContentViewer PageContent={props.PageContent} />
      </ScreenOverlay>
    );
  }

  return (
    <MaterialButton
      onClick={() => setShowPage(true)}
      variant="contained"
      size="small"
      startIcon={<VisibilityIcon />}
    >
      View React Page
    </MaterialButton>
  );
};

export default PageContentViewer;
