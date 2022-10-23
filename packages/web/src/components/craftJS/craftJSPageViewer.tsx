import { useState, useMemo, useEffect } from 'react';

// MUI
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';

// OTHERS
import lz from 'lzutf8';
import { useEditor, Editor, Frame } from '@craftjs/core';

// WEB
import ScreenOverlay from '../common/Overlay';
import Container from './components/Container';
import Btn from './components/Button';

const decodePageContent = (PageContent: PageContentViewerProps['PageContent']) =>
  lz.decompress(lz.decodeBase64(PageContent));

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
    <Editor resolver={{ Container, Btn }} enabled={false}>
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
    <Button
      onClick={() => setShowPage(true)}
      variant="contained"
      size="small"
      startIcon={<VisibilityIcon />}
    >
      View React Page
    </Button>
  );
};

export default PageContentViewer;
