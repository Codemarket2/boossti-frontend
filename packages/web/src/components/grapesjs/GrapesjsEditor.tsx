import { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import grapesjs from 'grapesjs';
import 'grapesjs-preset-newsletter';

import 'grapesjs/dist/css/grapes.min.css';
import { Button } from '@mui/material';
import { openStdin } from 'process';
import { on } from 'events';
import { addTagToLink } from './addTagToLink';

import FileLibrary from '../fileLibrary/FileLibrary';
import FileLibraryWrapper from '../fileLibrary/FileLibraryWrapper';

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

    editor.Commands.add('open-assets', {
      run(editor2, sender, opts) {
        const assettarget = opts.target;
        // code to open your own modal goes here.
        setState({ ...state, showLibrary: true, props: opts });
      },
    });
  }, []);
  const onUpload = (urls) => {
    state.props.target.set('src', urls[0]);
    setState({ ...state, showLibrary: false, props: null });
  };
  return (
    <div>
      {state.showLibrary && (
        <FileLibraryWrapper
          open={state.showLibrary}
          onClose={() => {
            // state.props.close();
            setState({ ...state, showLibrary: false });
          }}
          // onUpload={() => {
          //   setTimeout(() => {
          //     state.assettarget.set(
          //       'src',
          //       'https://media-exp1.licdn.com/dms/image/C5603AQFzwKRNsakUlQ/profile-displayphoto-shrink_100_100/0/1590643886102?e=1668643200&v=beta&t=oA7joIs0P-phuvglNWJIOOtvkuDpDSy_gY_oo5eIGdc',
          //     );
          //   }, 1);
          // }}
          onUpload={onUpload}
          onDelete={() => null}
          acceptedFileType={() => null}
        />
      )}
      <div id="gjs" />
    </div>
  );
}
