/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable consistent-return */
import { fileUpload } from '@frontend/shared/utils/fileUpload';
import Skeleton from '@mui/material/Skeleton';
import { useEffect, useRef, useState } from 'react';
import { client } from '@frontend/shared/graphql';
import { GET_MENTION_ITEMS } from '@frontend/shared/graphql/query/template';
import { TextField } from '@mui/material';

export async function getPages(queryText) {
  try {
    const response = await client.query({
      query: GET_MENTION_ITEMS,
      variables: { search: queryText },
    });
    return new Promise((resolve) => {
      let itemsToDisplay = response?.data?.getMentionItems;
      itemsToDisplay = itemsToDisplay?.map((val) => ({
        ...val,
        id: `@${val?.title} | ${val.category}`,
      }));
      resolve(itemsToDisplay);
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}

function mentionCustomization(editor) {
  editor.conversion.for('upcast').elementToAttribute({
    view: {
      name: 'a',
      key: 'data-mention',
      classes: 'mention',
      attributes: {
        'data-id': true,
        'data-type': true,
      },
    },
    model: {
      key: 'mention',
      value: (viewItem) => {
        const mentionAttribute = editor.plugins.get('Mention').toMentionAttribute(viewItem, {
          _id: viewItem.getAttribute('data-id'),
          type: viewItem.getAttribute('data-type'),
        });
        return mentionAttribute;
      },
    },
    converterPriority: 'high',
  });
  editor.conversion.for('downcast').attributeToElement({
    model: 'mention',
    view: (modelAttributeValue, { writer }) => {
      if (!modelAttributeValue) {
        return;
      }
      return writer.createAttributeElement(
        'a',
        {
          class: 'mention',
          'data-mention': modelAttributeValue.id,
          'data-id': modelAttributeValue._id,
          'data-type': modelAttributeValue.type,
        },
        {
          priority: 20,
          id: modelAttributeValue.uid,
        },
      );
    },
    converterPriority: 'high',
  });
}

const editorConfiguration = {
  toolbar: [
    'codeBlock',
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
        feed: getPages,
      },
    ],
  },
  extraPlugins: [mentionCustomization, uploadPlugin],
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
    writer.setStyle('min-height', '150px', editor.editing.view.document.getRoot());
    writer.setStyle('max-height', '90vh', editor.editing.view.document.getRoot());
  });
}

interface IProps {
  value: string;
  onChange: (arg: string) => void;
  testId?: string;
}

export default function RichTextarea2({ value = '', onChange, testId }: IProps) {
  const [loading, setLoading] = useState(false);
  const editorRef: any = useRef();
  const { CKEditor, Editor } = editorRef.current || {};

  useEffect(() => {
    if (process.env.NODE_ENV !== 'test') {
      editorRef.current = {
        CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
        Editor: require('./ckeditor-build/ckeditor'),
      };
      setLoading(true);
    }
  }, []);

  return (
    <div>
      {process.env.NODE_ENV !== 'test' ? (
        <>
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
            <Skeleton height={150} />
          )}
        </>
      ) : (
        <TextField
          fullWidth
          value={value}
          onChange={({ target }) => onChange(target.value)}
          multiline
          rows={4}
          inputProps={{ 'data-testid': testId }}
        />
      )}
    </div>
  );
}
