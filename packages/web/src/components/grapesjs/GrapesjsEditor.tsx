import { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import grapesjs from 'grapesjs';
import 'grapesjs-preset-newsletter';
import grapesjsTouch from 'grapesjs-touch';

import 'grapesjs/dist/css/grapes.min.css';

import { Button } from '@mui/material';
import { openStdin } from 'process';
import { on } from 'events';
import Save from '@mui/icons-material/Save';
// import webpagePlugin from 'grapesjs-preset-webpage';
import blockPlugin from 'grapesjs-blocks-basic';
import customCodePlugin from 'grapesjs-custom-code';
import navbarPlugin from 'grapesjs-navbar';
import scriptEditor from 'grapesjs-script-editor';
import { read } from 'fs';
import footerPlugin from './plugins/footerPlugin';
import FileLibraryWrapper from '../fileLibrary/FileLibraryWrapper';
import FileLibrary from '../fileLibrary/FileLibrary';
import { addTagToLink } from './addTagToLink';

export default function GrapesjsEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const [state, setState] = useState({ showLibrary: false, props: null });
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const widthValue = window.matchMedia('(max-width:900px)');

      if (widthValue?.matches) {
        setWidth('70rem');
        setHeight('120rem');
      } else {
        setWidth('100%');
        setHeight('100vh');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  //

  useEffect(() => {
    //  Block of code to try

    const editor = grapesjs.init({
      // ...
      container: '.gjs',
      width,
      height,

      plugins: [
        'gjs-preset-newsletter',
        footerPlugin,
        blockPlugin,
        customCodePlugin,
        navbarPlugin,
        scriptEditor,
        grapesjsTouch,
      ],

      storageManager: false,
    });

    if (value) {
      editor.setComponents(value);
    }

    editor.Panels.addButton('options', {
      id: 'options',
      attributes: { title: 'Save' },
      label: 'Save',
      command(editor2) {
        let html = editor2.runCommand('gjs-get-inlined-html');
        html = addTagToLink(html);
        // eslint-disable-next-line no-console
        console.log(html);
        onChange(html);
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
  }, [width]);

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
            setState({ ...state, showLibrary: false });
          }}
          onUpload={onUpload}
          onDelete={() => null}
          acceptedFileType={() => null}
        />
      )}
      <div className="gjs">{/* <div id="gjs" /> */}</div>
    </div>
  );
}
