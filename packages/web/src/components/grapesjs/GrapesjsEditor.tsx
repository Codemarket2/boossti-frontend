import { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import grapesjs from 'grapesjs';
import 'grapesjs-preset-webpage';

import 'grapesjs/dist/css/grapes.min.css';
import greapesTouch from 'grapesjs-touch';

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
import { string } from 'mathjs';
import landingPagePlugin1 from './plugins/landingpage1Plugin';
import landingPagePlugin2 from './plugins/landingpage2Plugin';
import footerPlugin from './plugins/footerPlugin';
import FileLibraryWrapper from '../fileLibrary/FileLibraryWrapper';
import FileLibrary from '../fileLibrary/FileLibrary';
import { addTagToLink } from './addTagToLink';
import footer2Plugin from './plugins/footer2plugin';
import userFormPlugin from './plugins/userFormPlugin';

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
      selectorManager: { componentFirst: true },
      styleManager: {
        sectors: [
          {
            name: 'General',
            properties: [
              {
                extend: 'float',
                type: 'radio',
                default: 'none',
                options: [
                  { value: 'none', className: 'fa fa-times' },
                  { value: 'left', className: 'fa fa-align-left' },
                  { value: 'right', className: 'fa fa-align-right' },
                ],
              },
              'display',
              { extend: 'position', type: 'select' },
              'top',
              'right',
              'left',
              'bottom',
            ],
          },
          {
            name: 'Dimension',
            open: false,
            properties: [
              'width',
              {
                id: 'flex-width',
                type: 'integer',
                name: 'Width',
                units: ['px', '%'],
                property: 'flex-basis',
                toRequire: 1,
              },
              'height',
              'max-width',
              'min-height',
              'margin',
              'padding',
            ],
          },
          {
            name: 'Typography',
            open: false,
            properties: [
              'font-family',
              'font-size',
              'font-weight',
              'letter-spacing',
              'color',
              'line-height',
              {
                extend: 'text-align',
                options: [
                  { id: 'left', label: 'Left', className: 'fa fa-align-left' },
                  { id: 'center', label: 'Center', className: 'fa fa-align-center' },
                  { id: 'right', label: 'Right', className: 'fa fa-align-right' },
                  { id: 'justify', label: 'Justify', className: 'fa fa-align-justify' },
                ],
              },
              {
                property: 'text-decoration',
                type: 'radio',
                default: 'none',
                options: [
                  { id: 'none', label: 'None', className: 'fa fa-times' },
                  { id: 'underline', label: 'underline', className: 'fa fa-underline' },
                  { id: 'line-through', label: 'Line-through', className: 'fa fa-strikethrough' },
                ],
              },
              'text-shadow',
            ],
          },
          {
            name: 'Decorations',
            open: false,
            properties: [
              'opacity',
              'border-radius',
              'border',
              'box-shadow',
              'background', // { id: 'background-bg', property: 'background', type: 'bg' }
            ],
          },
          {
            name: 'Extra',
            open: false,
            buildProps: ['transition', 'perspective', 'transform'],
          },
          {
            name: 'Flex',
            open: false,
            properties: [
              {
                name: 'Flex Container',
                property: 'display',
                type: 'select',
                defaults: 'block',
                list: [
                  { value: 'block', name: 'Disable' },
                  { value: 'flex', name: 'Enable' },
                ],
              },
              {
                name: 'Flex Parent',
                property: 'label-parent-flex',
                type: 'integer',
              },
              {
                name: 'Direction',
                property: 'flex-direction',
                type: 'radio',
                defaults: 'row',
                list: [
                  {
                    value: 'row',
                    name: 'Row',
                    className: 'icons-flex icon-dir-row',
                    title: 'Row',
                  },
                  {
                    value: 'row-reverse',
                    name: 'Row reverse',
                    className: 'icons-flex icon-dir-row-rev',
                    title: 'Row reverse',
                  },
                  {
                    value: 'column',
                    name: 'Column',
                    title: 'Column',
                    className: 'icons-flex icon-dir-col',
                  },
                  {
                    value: 'column-reverse',
                    name: 'Column reverse',
                    title: 'Column reverse',
                    className: 'icons-flex icon-dir-col-rev',
                  },
                ],
              },
              {
                name: 'Justify',
                property: 'justify-content',
                type: 'radio',
                defaults: 'flex-start',
                list: [
                  {
                    value: 'flex-start',
                    className: 'icons-flex icon-just-start',
                    title: 'Start',
                  },
                  {
                    value: 'flex-end',
                    title: 'End',
                    className: 'icons-flex icon-just-end',
                  },
                  {
                    value: 'space-between',
                    title: 'Space between',
                    className: 'icons-flex icon-just-sp-bet',
                  },
                  {
                    value: 'space-around',
                    title: 'Space around',
                    className: 'icons-flex icon-just-sp-ar',
                  },
                  {
                    value: 'center',
                    title: 'Center',
                    className: 'icons-flex icon-just-sp-cent',
                  },
                ],
              },
              {
                name: 'Align',
                property: 'align-items',
                type: 'radio',
                defaults: 'center',
                list: [
                  {
                    value: 'flex-start',
                    title: 'Start',
                    className: 'icons-flex icon-al-start',
                  },
                  {
                    value: 'flex-end',
                    title: 'End',
                    className: 'icons-flex icon-al-end',
                  },
                  {
                    value: 'stretch',
                    title: 'Stretch',
                    className: 'icons-flex icon-al-str',
                  },
                  {
                    value: 'center',
                    title: 'Center',
                    className: 'icons-flex icon-al-center',
                  },
                ],
              },
              {
                name: 'Flex Children',
                property: 'label-parent-flex',
                type: 'integer',
              },
              {
                name: 'Order',
                property: 'order',
                type: 'integer',
                defaults: 0,
                min: 0,
              },
              {
                name: 'Flex',
                property: 'flex',
                type: 'composite',
                properties: [
                  {
                    name: 'Grow',
                    property: 'flex-grow',
                    type: 'integer',
                    defaults: 0,
                    min: 0,
                  },
                  {
                    name: 'Shrink',
                    property: 'flex-shrink',
                    type: 'integer',
                    defaults: 0,
                    min: 0,
                  },
                  {
                    name: 'Basis',
                    property: 'flex-basis',
                    type: 'integer',
                    units: ['px', '%', ''],
                    unit: '',
                    defaults: 'auto',
                  },
                ],
              },
              {
                name: 'Align',
                property: 'align-self',
                type: 'radio',
                defaults: 'auto',
                list: [
                  {
                    value: 'auto',
                    name: 'Auto',
                  },
                  {
                    value: 'flex-start',
                    title: 'Start',
                    className: 'icons-flex icon-al-start',
                  },
                  {
                    value: 'flex-end',
                    title: 'End',
                    className: 'icons-flex icon-al-end',
                  },
                  {
                    value: 'stretch',
                    title: 'Stretch',
                    className: 'icons-flex icon-al-str',
                  },
                  {
                    value: 'center',
                    title: 'Center',
                    className: 'icons-flex icon-al-center',
                  },
                ],
              },
            ],
          },
        ],
      },
      plugins: [
        'grapesjs-preset-webpage',
        footerPlugin,
        blockPlugin,
        customCodePlugin,
        navbarPlugin,
        scriptEditor,

        greapesTouch,
        footer2Plugin,
        landingPagePlugin1,
        landingPagePlugin2,
        userFormPlugin,
      ],
      pluginsOpts: {
        'gjs-blocks-basic': { flexGrid: true },
      },
      storageManager: false,
    });

    if (value) {
      editor.setComponents(value);
    }
    // code for html edit
    const pfx = editor.getConfig().stylePrefix;
    const modal = editor.Modal;
    const cmdm = editor.Commands;
    const codeViewer = editor.CodeManager.getViewer('CodeMirror').clone();
    const pnm = editor.Panels;
    const container = document.createElement('div');
    const btnEdit = document.createElement('button');

    codeViewer.set({
      codeName: 'htmlmixed',
      readOnly: 0,
      theme: 'hopscotch',
      autoBeautify: true,
      autoCloseTags: true,
      autoCloseBrackets: true,
      lineWrapping: true,
      styleActiveLine: true,
      smartIndent: true,
      indentWithTabs: true,
    });

    btnEdit.innerHTML = 'Edit';
    btnEdit.className = `${pfx}btn-prim ${pfx}btn-import`;
    btnEdit.onclick = function () {
      const code = codeViewer.editor.getValue();
      editor.DomComponents.getWrapper().set('content', '');
      editor.setComponents(code.trim());
      modal.close();
    };
    cmdm.add('html-edit', {
      run(editor2, sender) {
        if (sender) {
          sender.set('active', 0);
        }
        let viewer = codeViewer.editor2;
        modal.setTitle('Edit code');
        if (!viewer) {
          const txtarea = document.createElement('textarea');
          container.appendChild(txtarea);
          container.appendChild(btnEdit);
          codeViewer.init(txtarea);
          viewer = codeViewer.editor2;
        }
        const InnerHtml = editor2.getHtml();
        const Css = editor2.getCss();
        modal.setContent('');
        modal.setContent(container);
        codeViewer.setContent(`${InnerHtml}<style>${Css}</style>`);
        modal.open();
        viewer.refresh();
      },
    });
    // code for adding button in the panels
    editor.Panels.addButton('options', [
      {
        id: 'options',
        attributes: { title: 'Save' },
        label: 'Save',
        command(editor2) {
          // let html = editor2.runCommand('gjs-get-inlined-html');
          let html: string = editor2.getHtml();
          const css: string = editor2.getCss();
          const inlineHtml = `
        <html>
        <head>
          <style>${css}</style>
        </head>
        ${html}
      <html/>
        `;
          html = addTagToLink(inlineHtml);
          // eslint-disable-next-line no-console
          console.log(html);
          onChange(html);
        },
      },
      {
        id: 'undo',
        className: 'fa fa-undo icon-undo',
        command(editor2, sender) {
          editor2.UndoManager.undo(1);
          sender.set('active', 0);
        },
        attributes: {
          title: 'Undo (CTRL/CMD + Z)',
        },
      },
      {
        id: 'redo',
        className: 'fa fa-repeat icon-redo',
        command(editor2, sender) {
          editor2.UndoManager.redo(1);
          sender.set('active', 0);
        },
        attributes: {
          title: 'Redo (CTRL/CMD + Y)',
        },
      },
      {
        id: 'edit',
        className: 'fa fa-edit',
        command: 'html-edit',
        attributes: {
          title: 'Edit',
        },
      },
    ]);

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
