// import dynamic from 'next/dynamic';
import React from 'react';
import GrapesjsEditor from '../src/components/common/GrapesjsEditor';
// const GrapesjsEditor = dynamic(() => import('../src/components/common/GrapesjsEditor'), {
//   ssr: false,
// });

export default function grapesjs() {
  return (
    <div>
      <GrapesjsEditor />
    </div>
  );
}
