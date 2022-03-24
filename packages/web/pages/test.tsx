import { useState } from 'react';
import ImagePicker2 from '../src/components/common/ImagePicker2';

export default function test() {
  const [state, setState] = useState({});
  return <ImagePicker2 state={state} setState={setState} />;
}
