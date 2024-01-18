import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FileLibrary from '../components/fileLibrary/FileLibrary';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/FileLibrary',
  component: FileLibrary,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof FileLibrary>;

const Template: ComponentStory<typeof FileLibrary> = (args) => {
  const [open, setOpen] = useState(true);
  const [files, setFiles] = useState([
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
  ]);
  return (
    <FileLibrary
      open={open}
      onClose={() => setOpen(false)}
      files={files}
      onUpload={(selectedFiles) => console.log({ selectedFiles })}
      onUploadNewFile={() => setOpen(false)}
      onDelete={(ids) => setFiles(files.filter((f) => !ids.includes(f.id)))}
      {...args}
    />
  );
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// const Template: ComponentStory<typeof FileLibrary> = (args) => <FileLibrary {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'File Library',
  open: true,
  files: [
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
  ],
};
