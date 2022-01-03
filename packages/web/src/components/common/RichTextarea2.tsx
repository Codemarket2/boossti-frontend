import { fileUpload } from '@frontend/shared/utils/fileUpload';
import Skeleton from '@material-ui/lab/Skeleton';
import { useEffect, useRef, useState } from 'react';

const editorConfiguration = {
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'superscript',
    'subscript',
    '|',
    'fontSize',
    'fontColor',
    'fontBackgroundColor',
    '|',
    'alignment',
    'outdent',
    'indent',
    'bulletedList',
    'numberedList',
    'blockQuote',
    '|',
    'link',
    'insertTable',
    'codeBlock',
    'imageUpload',
    'mediaEmbed',
    '|',
    'undo',
    'redo',
    '|',
    'sourceEditing',
    'htmlEmbed',
  ],
  image: {
    toolbar: [
      'imageStyle:inline',
      'imageStyle:block',
      // 'imageStyle:side',
      'imageStyle:alignLeft',
      'imageStyle:alignRight',
      '|',
      'toggleImageCaption',
      'imageTextAlternative',
    ],
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
  },
  mention: {
    feeds: [
      {
        marker: '@',
        feed: ['@Sumi', '@Vivek', '@Muzzamil', '@Robin', '@Ted'],
      },
    ],
  },
  extraPlugins: [uploadPlugin],
};

class MyUploadAdapter {
  loader: any;

  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(async (file) => {
      const urls = await fileUpload([file], '/ckeditor');
      return {
        default: urls[0],
      };
    });
  }
}

function uploadPlugin(editor) {
  // eslint-disable-next-line no-param-reassign
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
  editor.editing.view.change((writer) => {
    writer.setStyle('min-height', '200px', editor.editing.view.document.getRoot());
    writer.setStyle('max-height', '90vh', editor.editing.view.document.getRoot());
  });
}

interface IProps {
  value: string;
  onChange: (arg: string) => void;
}

export default function RichTextarea2({ value = '', onChange }: IProps) {
  const [loading, setLoading] = useState(false);
  const editorRef: any = useRef();
  const { CKEditor, Editor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
      Editor: require('@frontend/ckeditor'),
    };
    setLoading(true);
  }, []);

  return (
    <div>
      {loading ? (
        <CKEditor
          config={editorConfiguration}
          editor={Editor}
          data={value}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      ) : (
        <Skeleton height={200} />
      )}
    </div>
  );
}
