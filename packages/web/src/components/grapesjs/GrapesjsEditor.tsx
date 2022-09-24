import { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import grapesjs from 'grapesjs';
import 'grapesjs-preset-newsletter';

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

  useEffect(() => {
    const editor = grapesjs.init({
      container: '#gjs',
      height: '100vh',

      plugins: ['gjs-preset-newsletter', blockPlugin, customCodePlugin, navbarPlugin, scriptEditor],
      storageManager: false,
    });
    const blockManager = editor.Blocks;
    blockManager.add('Footer-block', {
      label: 'Footer',
      content: ` <div data-gjs="navbar" class="navbar" style="box-sizing: border-box; position:absolute ; top:100% ; background-color: rgb(34, 34, 34); color: rgb(221, 221, 221); min-height: 50px; width: 100%;">
    <div class="navbar-container" style="box-sizing: border-box; max-width: 950px; margin-top: 0px; margin-right: auto; margin-bottom: 0px; margin-left: auto; width: 95%;">
      <a href="/" class="navbar-brand" style="box-sizing: border-box; vertical-align: top; display: inline-block; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px; min-height: 50px; min-width: 50px; color: inherit; text-decoration-line: none; text-decoration-style: solid; text-decoration-color: currentcolor; text-decoration-thickness: auto;"></a>
      <div id="ikl6" class="navbar-burger" style="box-sizing: border-box; margin-top: 10px; margin-right: 0px; margin-bottom: 10px; margin-left: 0px; width: 45px; padding-top: 5px; padding-right: 10px; padding-bottom: 5px; padding-left: 10px; display: none; float: right; cursor: pointer;">
        <div class="navbar-burger-line" style="box-sizing: border-box; padding-top: 1px; padding-right: 1px; padding-bottom: 1px; padding-left: 1px; background-color: white; margin-top: 5px; margin-right: 0px; margin-bottom: 5px; margin-left: 0px;">
        </div>
        <div class="navbar-burger-line" style="box-sizing: border-box; padding-top: 1px; padding-right: 1px; padding-bottom: 1px; padding-left: 1px; background-color: white; margin-top: 5px; margin-right: 0px; margin-bottom: 5px; margin-left: 0px;">
        </div>
        <div class="navbar-burger-line" style="box-sizing: border-box; padding-top: 1px; padding-right: 1px; padding-bottom: 1px; padding-left: 1px; background-color: white; margin-top: 5px; margin-right: 0px; margin-bottom: 5px; margin-left: 0px;">
        </div>
      </div>
      <div data-gjs="navbar-items" class="navbar-items-c" style="box-sizing: border-box; display: inline-block; float: right;">
        <nav data-gjs="navbar-menu" class="navbar-menu" style="box-sizing: border-box; padding-top: 10px; padding-right: 0px; padding-bottom: 10px; padding-left: 0px; display: block; float: right; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px;">
          <a href="#" class="navbar-menu-link" style="box-sizing: border-box; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; color: inherit; text-decoration-line: none; text-decoration-style: solid; text-decoration-color: currentcolor; text-decoration-thickness: auto; display: inline-block; padding-top: 10px; padding-right: 15px; padding-bottom: 10px; padding-left: 15px;">Home</a>
          <a href="#" class="navbar-menu-link" style="box-sizing: border-box; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; color: inherit; text-decoration-line: none; text-decoration-style: solid; text-decoration-color: currentcolor; text-decoration-thickness: auto; display: inline-block; padding-top: 10px; padding-right: 15px; padding-bottom: 10px; padding-left: 15px;">About</a>
          <a href="#" class="navbar-menu-link" style="box-sizing: border-box; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; color: inherit; text-decoration-line: none; text-decoration-style: solid; text-decoration-color: currentcolor; text-decoration-thickness: auto; display: inline-block; padding-top: 10px; padding-right: 15px; padding-bottom: 10px; padding-left: 15px;">Contact</a>
        </nav>
      </div>
    </div>
  </div>`,
      category: 'Custom',
      attributes: {
        title: 'Insert Footer block',
      },
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
            setState({ ...state, showLibrary: false });
          }}
          onUpload={onUpload}
          onDelete={() => null}
          acceptedFileType={() => null}
        />
      )}
      <div id="gjs" />
    </div>
  );
}
