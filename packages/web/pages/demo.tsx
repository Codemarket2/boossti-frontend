import { Button } from '@mui/material';
import { useState } from 'react';
import FileLibrary from '../src/components/fileLibrary/FileLibrary';

const demoFiles = [
  {
    id: '123',
    url:
      'https://rukminim1.flixcart.com/image/612/612/jxqfonk0/kit/3/3/r/football-training-kit-kit2-nivia-original-imaf42fyevkzq8hz.jpeg?q=70',
  },
  {
    id: '1234',
    url:
      'https://rukminim1.flixcart.com/image/416/416/j9zyd8w0/bat/q/h/h/weight-range-1100-1250-g-long-handle-endorsed-english-willow-mr-original-imaethmr6hjfu9fe.jpeg?q=70',
  },
];

export default function Page() {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState(demoFiles);
  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Select File
      </Button>
      {open && (
        <FileLibrary
          open={open}
          onClose={() => setOpen(false)}
          files={files}
          onUpload={(selectedFiles) => null}
          onUploadNewFile={() => setOpen(false)}
          onDelete={(ids) => setFiles(files.filter((f) => !ids.includes(f.id)))}
        />
      )}
    </div>
  );
}
