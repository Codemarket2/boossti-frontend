import { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import grapesjs from 'grapesjs';
import 'grapesjs-preset-newsletter';

import 'grapesjs/dist/css/grapes.min.css';
import { Button } from '@mui/material';
import { addTagToLink } from './addTagToLink';

import FileLibrary from '../fileLibrary/FileLibrary';

export default function GrapesjsEditor() {
  const [state, setState] = useState({ showLibrary: false, props: null });

  useEffect(() => {
    const editor = grapesjs.init({
      container: '#gjs',
      height: '100vh',
      plugins: ['gjs-preset-newsletter'],
      assetManager: {
        // custom: {
        //   open(props) {
        //     setState({ ...state, showLibrary: true, props });
        //   },
        //   close(props) {},
        // },
      },

      storageManager: false,
    });

    editor.Panels.addButton('options', {
      id: 'options',
      attributes: { title: 'Save' },
      label: 'Save',
      command(editor2) {
        let html = editor2.runCommand('gjs-get-inlined-html');
        html = addTagToLink(html);
        // eslint-disable-next-line no-console
        console.log(html);
        alert('Saving to database');
      },
    });
    // editor.Commands.add('open-assets', {
    //   run(editor, sender, opts) {
    //     const assettarget = opts.target;
    //     // code to open your own modal goes here.
    //     <FileLibrary
    //       open={true}
    //       onClose={() => null}
    //       files={[]}
    //       title="File Library"
    //       onUpload={() => null}
    //       onUploadNewFile={() => null}
    //       onDelete={() => null}
    //       acceptedFileType={() => null}
    //     />;
    //   },
    // });
    // const assetManager = editor.AssetManager;
    // if (assetManager.isOpen()) {
    //   setIsOpen(true);
    // }
  }, []);

  return (
    <div>
      {state.showLibrary && (
        <FileLibrary
          open={state.showLibrary}
          onClose={() => {
            state.props.close();
            setState({ ...state, showLibrary: false });
          }}
          files={[]}
          title="File Library"
          onUpload={() => state.props.FileUploader()}
          onUploadNewFile={() => state.props.FileUploader()}
          onDelete={() => null}
          acceptedFileType={() => null}
        />
      )}
      <div id="gjs" />
    </div>
  );
}
