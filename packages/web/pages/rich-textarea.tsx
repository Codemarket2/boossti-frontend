import dynamic from 'next/dynamic';
import { useState } from 'react';
const RichTextarea = dynamic(() => import('../src/components/common/RichTextarea2'), {
  ssr: false,
});
import parse from 'html-react-parser';

export default function Page() {
  const [state, setState] = useState('');

  return (
    <div className="container mt-5">
      <RichTextarea value={state} onChange={(value) => setState(value)} />
      <div className="ck-content mt-5">{parse(state)}</div>
    </div>
  );
}
