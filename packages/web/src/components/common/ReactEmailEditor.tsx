import { Button } from '@mui/material';
import { useRef } from 'react';
import EmailEditor from 'react-email-editor';

export default function ReactEmailEditor() {
  const emailEditorRef = useRef(null);

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      // eslint-disable-next-line no-console
      console.log('exportHtml', html);
    });
  };

  const onLoad = () => {
    // editor instance is created
    // you can load your template here;
    // const templateJson = {};
    // emailEditorRef.current.editor.loadDesign(templateJson);
  };

  const onReady = () => {
    // editor is ready
    // console.log('onReady');
  };
  return (
    <div style={{ height: '100vh' }}>
      <div>
        <Button onClick={exportHtml} variant="contained">
          Export HTML
        </Button>
      </div>
      <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
    </div>
  );
}
