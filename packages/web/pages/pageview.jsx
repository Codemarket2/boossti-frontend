import dynamic from 'next/dynamic';
const PageView = dynamic(() => import('../src/components/contentbuilder/PageView'), {
  ssr: false,
});

export default function Builder() {
  return (
    <div>
      <PageView />
    </div>
  );
}
