// import dynamic from 'next/dynamic';
import React from 'react';
import GrapesjsEditor from '../src/components/grapesjs/GrapesjsEditor';
// const GrapesjsEditor = dynamic(() => import('../src/components/common/GrapesjsEditor'), {
//   ssr: false,
// });

export default function grapesjs({ value, onChange }) {
  return (
    <div>
      <GrapesjsEditor value={value} onChange={onChange} />
    </div>
  );
}
