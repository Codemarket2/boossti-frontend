import Editor from '@frontend/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { fileUpload } from '@frontend/shared/utils/fileUpload';
import Skeleton from '@material-ui/lab/Skeleton';
import { useState } from 'react';
import { client } from '@frontend/shared/graphql';
import { GET_LIST_ITEMS_BY_TYPE } from '@frontend/shared/graphql/query/list';

export async function getListItems(queryText) {
  try {
    const response = await client.query({
      query: GET_LIST_ITEMS_BY_TYPE,
      variables: { search: queryText },
    });
    return new Promise((resolve) => {
      setTimeout(() => {
        let itemsToDisplay = response?.data?.getListItems?.data;
        itemsToDisplay = itemsToDisplay?.map(
          (val) =>
            (val = {
              ...val,
              id: `@${val?.title} | ${val.types && val?.types[0]?.title}`,
            }),
        );
        resolve(itemsToDisplay);
      }, 100);
    });
  } catch (e) {
    console.log(e);
  }
}

const editorConfiguration = {
  toolbar: [
    'sourceEditing',
    'htmlEmbed',
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
        feed: getListItems,
      },
    ],
  },
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

interface IProps {
  value: string;
  onChange: (arg: string) => void;
}

export default function RichTextarea({ value = '', onChange }: IProps) {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading && <Skeleton variant="rect" height="150px" />}
      <CKEditor
        config={editorConfiguration}
        editor={Editor}
        data={value}
        onReady={(editor) => {
          editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new MyUploadAdapter(loader);
          };
          editor.editing.view.change((writer) => {
            writer.setStyle('min-height', '200px', editor.editing.view.document.getRoot());
            writer.setStyle('max-height', '90vh', editor.editing.view.document.getRoot());
          });
          setLoading(false);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </>
  );
}
