import { useState } from 'react';
import ImagePicker2 from '../src/components/common/ImagePicker2';

export default function test() {
  const [state, setState] = useState({
    showForm: false,
    showCRUDMenu: null,
    selectedPage: null,
    media: [],
    tempMediaFiles: [],
    tempMedia: [],
  });
  return <ImagePicker2 state={state} setState={setState} />;
}
