import dynamic from 'next/dynamic';
const Edit = dynamic(() => import('../src/components/contentbuilder/Builder'), {
  ssr: false,
});

export default function Builder() {
  return (
    <div>
      <Edit />
    </div>
  );
}
